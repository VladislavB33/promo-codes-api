import { PromoCodeEntity } from '../entities/promo-code.entity';

export class PromoCodeResponseDto {
    id: string;
    code: string;
    discountPercent: number;
    maxActivations: number;
    currentActivations: number;
    expiresAt: string;
    createdAt: string;

    constructor(data: PromoCodeResponseDto) {
        Object.assign(this, data);
    }

    static fromEntity(entity: PromoCodeEntity): PromoCodeResponseDto {
        return new PromoCodeResponseDto({
            id: entity.id,
            code: entity.code,
            discountPercent: entity.discountPercent,
            maxActivations: entity.maxActivations,
            currentActivations: entity.currentActivations,
            expiresAt: entity.expiresAt.toISOString(),
            createdAt: entity.createdAt.toISOString(),
        });
    }
}
