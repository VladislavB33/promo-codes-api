import { PromoCodeBaseException } from './promo-code.base.exception';

export class PromoCodeAlreadyExistsException extends PromoCodeBaseException {
    constructor(code?: string) {
        super(code ? `Промокод "${code}" уже существует` : 'Промокод уже существует', {
            code: 'PROMO_CODE_ALREADY_EXISTS',
            httpCode: 409,
        });
    }
}
