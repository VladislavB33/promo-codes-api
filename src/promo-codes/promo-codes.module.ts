import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivationEntity } from './entities/activation.entity';
import { PromoCodeEntity } from './entities/promo-code.entity';
import { PromoCodesController } from './promo-codes.controller';
import { PromoCodesService } from './promo-codes.service';

@Module({
    imports: [TypeOrmModule.forFeature([PromoCodeEntity, ActivationEntity])],
    controllers: [PromoCodesController],
    providers: [PromoCodesService],
})
export class PromoCodesModule {}
