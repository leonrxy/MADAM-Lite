import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ length: 30, unique: true, nullable: false })
    username: string;

    @Column({ length: 255, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, type: 'enum', enum: ['user', 'superadmin'], default: 'user' })
    role: string;

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: null })
    created_at: Date;

    @UpdateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP()', precision: null })
    updated_at: Date;
}