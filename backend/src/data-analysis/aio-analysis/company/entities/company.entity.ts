import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'company' })
export class Company {
    @PrimaryGeneratedColumn()
    company_id: number;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    company_name: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    industry: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    address: string;

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}
