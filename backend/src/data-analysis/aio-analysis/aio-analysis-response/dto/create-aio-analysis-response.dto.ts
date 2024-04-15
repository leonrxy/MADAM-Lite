import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateCompanyInformationResponseDto } from "../../company-information-response/dto/create-company-information-response.dto";
import { CreateDemographResponseDto } from "../../demograph-response/dto/create-demograph-response.dto";
import { CreatePsychographResponseDto } from "../../psychograph-response/dto/create-psychograph-response.dto";
import { CreateCompanyDto } from "../../company/dto/create-company.dto";

export class CreateAioAnalysisResponseDto {
    user_id: number;

    @IsString()
    additional_notes: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateCompanyDto)
    newCompany: CreateCompanyDto;

    @ValidateNested()
    @Type(() => CreateCompanyInformationResponseDto)
    companyInfo: CreateCompanyInformationResponseDto;

    @ValidateNested({ each: true })
    @Type(() => CreateDemographResponseDto)
    demograph: CreateDemographResponseDto[];

    @ValidateNested({ each: true })
    @Type(() => CreatePsychographResponseDto)
    psychograph: CreatePsychographResponseDto[];
}
