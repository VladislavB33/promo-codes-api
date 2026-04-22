import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ActivationEntity } from './activation.entity';

@Entity('promo_codes')
export class PromoCodeEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 64, nullable: false, name: 'code' })
    code: string;

    @Column({
        type: 'decimal',
        precision: 5,
        scale: 2,
        nullable: false,
        name: 'discount_percent',
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        },
    })
    discountPercent: number;

    @Column({ type: 'int', nullable: false, name: 'max_activations' })
    maxActivations: number;

    @Column({ type: 'int', nullable: false, default: 0, name: 'current_activations' })
    currentActivations: number;

    @Column({ type: 'timestamptz', nullable: false, name: 'expires_at' })
    expiresAt: Date;

    @CreateDateColumn({ type: 'timestamptz', nullable: false, name: 'created_at' })
    readonly createdAt: Date;

    @OneToMany(() => ActivationEntity, (activation) => activation.promoCode)
    activations: ActivationEntity[];
}
