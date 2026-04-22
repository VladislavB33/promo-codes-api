import { PromoCodeEntity } from '../entities/promo-code.entity';

import { ActivationResponseDto } from './activation.response.dto';

export class PromoCodeDetailResponseDto {
    id: string;
    code: string;
    discountPercent: number;
    maxActivations: number;
    currentActivations: number;
    expiresAt: string;
    createdAt: string;
    activations: ActivationResponseDto[];

    constructor(data: PromoCodeDetailResponseDto) {
        Object.assign(this, data);
    }

    static fromEntity(entity: PromoCodeEntity): PromoCodeDetailResponseDto {
        return new PromoCodeDetailResponseDto({
            id: entity.id,
            code: entity.code,
            discountPercent: entity.discountPercent,
            maxActivations: entity.maxActivations,
            currentActivations: entity.currentActivations,
            expiresAt: entity.expiresAt.toISOString(),
            createdAt: entity.createdAt.toISOString(),
            activations: (entity.activations ?? []).map(ActivationResponseDto.fromEntity),
        });
    }
}
