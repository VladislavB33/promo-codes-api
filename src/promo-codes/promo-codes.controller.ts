import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseUUIDPipe,
    Post,
    Query,
} from '@nestjs/common';

import { BaseException } from '../common/exception/base.exception';

import { ActivatePromoCodeDto } from './dto/activate-promo-code.dto';
import { ActivationResponseDto } from './dto/activation.response.dto';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { GetPromoCodesQueryDto } from './dto/get-promo-codes-query.dto';
import { PromoCodeDetailResponseDto } from './dto/promo-code-detail.response.dto';
import { PromoCodeListResponseDto } from './dto/promo-code-list.response.dto';
import { PromoCodeResponseDto } from './dto/promo-code.response.dto';
import { PromoCodesService } from './promo-codes.service';

@Controller('promo-codes')
export class PromoCodesController {
    protected readonly logger = new Logger(PromoCodesController.name);

    constructor(protected readonly promoCodesService: PromoCodesService) {}

    @Post()
    async create(@Body() dto: CreatePromoCodeDto): Promise<PromoCodeResponseDto> {
        try {
            const entity = await this.promoCodesService.create(dto);
            return PromoCodeResponseDto.fromEntity(entity);
        } catch (error: unknown) {
            this.logError('Unable to create promo code', error);
            throw error;
        }
    }

    @Get()
    async findAll(@Query() query: GetPromoCodesQueryDto): Promise<PromoCodeListResponseDto> {
        try {
            const { data, total } = await this.promoCodesService.findAll(query.page, query.limit);
            return PromoCodeListResponseDto.fromEntities(data, total);
        } catch (error: unknown) {
            this.logError('Unable to list promo codes', error);
            throw error;
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PromoCodeDetailResponseDto> {
        try {
            const entity = await this.promoCodesService.findOne(id);
            return PromoCodeDetailResponseDto.fromEntity(entity);
        } catch (error: unknown) {
            this.logError('Unable to find promo code', error);
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        try {
            await this.promoCodesService.remove(id);
        } catch (error: unknown) {
            this.logError('Unable to delete promo code', error);
            throw error;
        }
    }

    @Post(':id/activate')
    @HttpCode(HttpStatus.CREATED)
    async activate(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: ActivatePromoCodeDto,
    ): Promise<ActivationResponseDto> {
        try {
            const entity = await this.promoCodesService.activate(id, dto.email);
            return ActivationResponseDto.fromEntity(entity);
        } catch (error: unknown) {
            this.logError('Unable to activate promo code', error);
            throw error;
        }
    }

    protected logError(prefix: string, error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (error instanceof BaseException) {
            this.logger.warn(`${prefix}: ${errorMessage}`);
        } else {
            this.logger.error(`${prefix}: ${errorMessage}`);
        }
    }
}
