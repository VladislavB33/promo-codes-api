import { ActivationEntity } from '../entities/activation.entity';

export class ActivationResponseDto {
    id: string;
    email: string;
    promoCodeId: string;
    activatedAt: string;

    constructor(data: ActivationResponseDto) {
        Object.assign(this, data);
    }

    static fromEntity(entity: ActivationEntity): ActivationResponseDto {
        return new ActivationResponseDto({
            id: entity.id,
            email: entity.email,
            promoCodeId: entity.promoCodeId,
            activatedAt: entity.activatedAt.toISOString(),
        });
    }
}
