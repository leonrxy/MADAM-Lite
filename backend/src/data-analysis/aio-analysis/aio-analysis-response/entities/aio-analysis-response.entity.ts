import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DemographResponse } from "../../demograph-response/entities/demograph-response.entity";

@Entity({ name: 'aio_analysis_response' })
export class AioAnalysisResponse {
    @PrimaryGeneratedColumn()
    aio_analysis_response_id: number;

    @ManyToOne(() => User, users => users.user_id, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user_id: User;

    @OneToMany(() => DemographResponse, demograph_response => demograph_response.demograph_response_id)
    demograph_response_id: DemographResponse;

}
