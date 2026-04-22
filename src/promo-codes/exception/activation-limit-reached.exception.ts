import { PromoCodeBaseException } from './promo-code.base.exception';

export class ActivationLimitReachedException extends PromoCodeBaseException {
    constructor() {
        super('Достигнут лимит активаций промокода', {
            code: 'ACTIVATION_LIMIT_REACHED',
            httpCode: 409,
        });
    }
}
