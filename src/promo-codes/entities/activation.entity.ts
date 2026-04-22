import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { PromoCodeEntity } from './promo-code.entity';

@Entity('activations')
@Unique('UQ_activation_email_promo', ['email', 'promoCodeId'])
export class ActivationEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'email' })
    email: string;

    @Column({ type: 'uuid', nullable: false, name: 'promo_code_id' })
    promoCodeId: string;

    @ManyToOne(() => PromoCodeEntity, (promoCode) => promoCode.activations, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'promo_code_id' })
    promoCode: PromoCodeEntity;

    @CreateDateColumn({ type: 'timestamptz', nullable: false, name: 'activated_at' })
    readonly activatedAt: Date;
}
