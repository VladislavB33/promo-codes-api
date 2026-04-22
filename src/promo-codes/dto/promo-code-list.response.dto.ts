import { PromoCodeEntity } from '../entities/promo-code.entity';

import { PromoCodeResponseDto } from './promo-code.response.dto';

export class PromoCodeListResponseDto {
    data: PromoCodeResponseDto[];
    total: number;

    constructor(data: PromoCodeListResponseDto) {
        Object.assign(this, data);
    }

    static fromEntities(entities: PromoCodeEntity[], total: number): PromoCodeListResponseDto {
        return new PromoCodeListResponseDto({
            data: entities.map(PromoCodeResponseDto.fromEntity),
            total,
        });
    }
}
