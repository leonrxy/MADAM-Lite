import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DemographOption } from './demograph-option.entity';

@Entity({ name: 'demograph' })
export class Demograph {
    @PrimaryGeneratedColumn()
    demograph_id: number;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    parameter_name: string;

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => DemographOption, option => option.demograph_id)
    options: DemographOption[];
}
