import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePromoCodeDto {
    @IsString()
    @MinLength(1)
    @MaxLength(64)
    @Transform(({ value }) => (typeof value === 'string' ? value.trim().toUpperCase() : value))
    code: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0.01)
    @Max(100)
    discountPercent: number;

    @IsInt()
    @Min(1)
    maxActivations: number;

    @IsDateString()
    expiresAt: string;
}
