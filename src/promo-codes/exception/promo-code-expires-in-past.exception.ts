import { PromoCodeBaseException } from './promo-code.base.exception';

export class PromoCodeExpiresInPastException extends PromoCodeBaseException {
    constructor() {
        super('Дата истечения должна быть в будущем', {
            code: 'PROMO_CODE_EXPIRES_IN_PAST',
            httpCode: 400,
        });
    }
}
