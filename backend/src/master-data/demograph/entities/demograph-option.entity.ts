import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Demograph } from './demograph.entity';

@Entity({ name: 'demograph_option' })
export class DemographOption {
  @PrimaryGeneratedColumn()
  demograph_option_id: number;

  @ManyToOne(() => Demograph, demograph => demograph.options, { nullable: false })
  @JoinColumn({ name: "demograph_id" })
  demograph_id: Demograph;

  @Column()
  option_value: string;

  @Column()
  result_value: string;

  @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}