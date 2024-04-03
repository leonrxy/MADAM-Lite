import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AioAnalysisResponse } from "../../aio-analysis-response/entities/aio-analysis-response.entity";
import { Company } from "../../company/entities/company.entity";

@Entity({ name: 'company_information_response' })
export class CompanyInformationResponse {
    @PrimaryGeneratedColumn()
    company_information_response_id: number;

    @OneToOne(() => AioAnalysisResponse, aio_analysis_response => aio_analysis_response.aio_analysis_response_id, { nullable: false })
    @JoinColumn({ name: "aio_analysis_response_id" })
    aio_analysis_response_id: AioAnalysisResponse;

    @OneToOne(() => Company, company => company.company_id, { nullable: false })
    @JoinColumn({ name: "company_id" })
    company_id: Company;

    @Column({ type: "varchar", length: 255, nullable: false })
    full_name: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    email_address: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    position_or_title: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    phone_number: string;
}
