import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';

import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { ActivationEntity } from './entities/activation.entity';
import { PromoCodeEntity } from './entities/promo-code.entity';
import { ActivationAlreadyExistsException } from './exception/activation-already-exists.exception';
import { ActivationLimitReachedException } from './exception/activation-limit-reached.exception';
import { PromoCodeAlreadyExistsException } from './exception/promo-code-already-exists.exception';
import { PromoCodeExpiredException } from './exception/promo-code-expired.exception';
import { PromoCodeExpiresInPastException } from './exception/promo-code-expires-in-past.exception';
import { PromoCodeNotFoundException } from './exception/promo-code-not-found.exception';

const PG_UNIQUE_VIOLATION = '23505';

@Injectable()
export class PromoCodesService {
    constructor(
        @InjectRepository(PromoCodeEntity)
        protected readonly promoCodeRepo: Repository<PromoCodeEntity>,
        protected readonly dataSource: DataSource,
    ) {}

    async create(dto: CreatePromoCodeDto): Promise<PromoCodeEntity> {
        if (new Date(dto.expiresAt) <= new Date()) {
            throw new PromoCodeExpiresInPastException();
        }

        const promoCode = this.promoCodeRepo.create({
            code: dto.code,
            discountPercent: dto.discountPercent,
            maxActivations: dto.maxActivations,
            expiresAt: new Date(dto.expiresAt),
        });

        try {
            return await this.promoCodeRepo.save(promoCode);
        } catch (error) {
            if (
                error instanceof QueryFailedError &&
                'code' in error.driverError &&
                error.driverError.code === PG_UNIQUE_VIOLATION
            ) {
                throw new PromoCodeAlreadyExistsException(dto.code);
            }
            throw error;
        }
    }

    async findAll(page = 1, limit = 20): Promise<{ data: PromoCodeEntity[]; total: number }> {
        const [data, total] = await this.promoCodeRepo.findAndCount({
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, total };
    }

    async findOne(id: string): Promise<PromoCodeEntity> {
        const promoCode = await this.promoCodeRepo.findOne({
            where: { id },
            relations: ['activations'],
        });
        if (!promoCode) {
            throw new PromoCodeNotFoundException();
        }
        return promoCode;
    }

    async remove(id: string): Promise<void> {
        const result = await this.promoCodeRepo.delete(id);
        if (result.affected === 0) {
            throw new PromoCodeNotFoundException();
        }
    }

    async activate(id: string, email: string): Promise<ActivationEntity> {
        return this.dataSource.transaction(async (manager) => {
            const promoCode = await manager
                .getRepository(PromoCodeEntity)
                .createQueryBuilder('pc')
                .setLock('pessimistic_write')
                .where('pc.id = :id', { id })
                .getOne();

            if (!promoCode) {
                throw new PromoCodeNotFoundException();
            }

            if (new Date() > promoCode.expiresAt) {
                throw new PromoCodeExpiredException();
            }

            if (promoCode.currentActivations >= promoCode.maxActivations) {
                throw new ActivationLimitReachedException();
            }

            const existing = await manager.findOne(ActivationEntity, {
                where: { promoCodeId: id, email },
            });
            if (existing) {
                throw new ActivationAlreadyExistsException();
            }

            promoCode.currentActivations += 1;
            await manager.save(PromoCodeEntity, promoCode);

            const activation = manager.create(ActivationEntity, {
                email,
                promoCodeId: id,
            });
            return manager.save(ActivationEntity, activation);
        });
    }
}
