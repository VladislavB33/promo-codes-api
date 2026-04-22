import { PromoCodeBaseException } from './promo-code.base.exception';

export class ActivationAlreadyExistsException extends PromoCodeBaseException {
    constructor() {
        super('Этот email уже активировал данный промокод', {
            code: 'ACTIVATION_ALREADY_EXISTS',
            httpCode: 409,
        });
    }
}
