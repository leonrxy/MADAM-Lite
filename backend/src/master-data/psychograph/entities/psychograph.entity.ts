import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'psychograph'})
export class Psychograph {

    @PrimaryGeneratedColumn()
    psychograph_id: number;

    @Column({
        type: 'enum',
        enum: ['activity', 'interest', 'opinion'],
        nullable: false
    })
    type: string;

    @Column()
    option_value: string;

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
