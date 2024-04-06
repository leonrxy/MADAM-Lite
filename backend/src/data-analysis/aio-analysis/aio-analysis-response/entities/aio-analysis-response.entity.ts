import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DemographResponse } from "../../demograph-response/entities/demograph-response.entity";
import { PsychographResponse } from "../../psychograph-response/entities/psychograph-response.entity";
import { CompanyInformationResponse } from "../../company-information-response/entities/company-information-response.entity";

@Entity({ name: 'aio_analysis_response' })
export class AioAnalysisResponse {
    @PrimaryGeneratedColumn()
    aio_analysis_response_id: number;

    @ManyToOne(() => User, users => users.user_id, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user_id: User;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    additional_notes: string;

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: null })
    submitted_at: Date;

    @OneToOne(() => CompanyInformationResponse, company_information_response => company_information_response.aio_analysis_response_id)
    company_information_response: DemographResponse;

    @OneToMany(() => DemographResponse, demograph_response => demograph_response.aio_analysis_response_id)
    demograph_response: DemographResponse[];

    @OneToMany(() => PsychographResponse, psychograph_response => psychograph_response.aio_analysis_response_id)
    psychograph_response: PsychographResponse[];

}
