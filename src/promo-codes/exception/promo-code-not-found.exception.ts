import { PromoCodeBaseException } from './promo-code.base.exception';

export class PromoCodeNotFoundException extends PromoCodeBaseException {
    constructor(message?: string) {
        super(message ?? 'Промокод не найден', {
            code: 'PROMO_CODE_NOT_FOUND',
            httpCode: 404,
        });
    }
}
