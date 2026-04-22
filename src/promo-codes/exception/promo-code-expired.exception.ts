import { PromoCodeBaseException } from './promo-code.base.exception';

export class PromoCodeExpiredException extends PromoCodeBaseException {
    constructor() {
        super('Срок действия промокода истёк', {
            code: 'PROMO_CODE_EXPIRED',
            httpCode: 400,
        });
    }
}
