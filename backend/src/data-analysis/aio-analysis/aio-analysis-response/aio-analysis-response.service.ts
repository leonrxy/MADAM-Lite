import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AioAnalysisResponse } from './entities/aio-analysis-response.entity';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyInformationResponse } from '../company-information-response/entities/company-information-response.entity';
import { DemographResponse } from '../demograph-response/entities/demograph-response.entity';
import { PsychographResponse } from '../psychograph-response/entities/psychograph-response.entity';
import { Company } from '../company/entities/company.entity';
import { PsychographResponseData } from '../psychograph-response-data/entities/psychograph-response-data.entity';
import { CreateAioAnalysisResponseDto } from './dto/create-aio-analysis-response.dto';
import { User } from 'src/users/entities/user.entity';
import { ActivityHistory } from 'src/activity-history/entities/activity-history.entity';

@Injectable()
export class AioAnalysisResponseService {
  constructor(
    @InjectRepository(AioAnalysisResponse)
    private readonly aioRepository: Repository<AioAnalysisResponse>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CompanyInformationResponse)
    private readonly companyInfoRepository: Repository<CompanyInformationResponse>,
    @InjectRepository(DemographResponse)
    private readonly demographResponseRepository: Repository<DemographResponse>,
    @InjectRepository(PsychographResponse)
    private readonly psychographResponseRepository: Repository<PsychographResponse>,
    @InjectRepository(PsychographResponseData)
    private readonly psychographResponseDataRepository: Repository<PsychographResponseData>,
    @InjectRepository(ActivityHistory)
    private readonly activityHistoryRepository: Repository<ActivityHistory>,
    private readonly connection: Connection,
  ) { }

  async submit(data: CreateAioAnalysisResponseDto, user_id: number): Promise<any> {
    // Validasi data yang diterima
    if (!data || !data.companyInfo || !data.demograph || !data.psychograph) {
      throw new BadRequestException('Incomplete data provided');
    }
    let queryRunner: QueryRunner;

    try {
      queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Find the user
      const user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) {
        throw new BadRequestException(`User not found`);
      }

      //Create AIO Analysis

      const aioAnalysisResponse = new AioAnalysisResponse();
      aioAnalysisResponse.user_id = user;
      aioAnalysisResponse.additional_notes = data.additional_notes;

      const savedAioAnalysis = await queryRunner.manager.save(AioAnalysisResponse, aioAnalysisResponse);

      // Create Company Information
      const companyInfo = new CompanyInformationResponse();
      companyInfo.full_name = data.companyInfo.full_name;
      companyInfo.email_address = data.companyInfo.email_address;
      companyInfo.position_or_title = data.companyInfo.position_or_title;
      companyInfo.phone_number = data.companyInfo.phone_number;
      companyInfo.aio_analysis_response_id = savedAioAnalysis;
      //Get company by ID or create new company
      if (data.newCompany) {
        try {
          const savedCompany = await queryRunner.manager.save(Company, data.newCompany);
          console.log(savedCompany);
          companyInfo.company_id = savedCompany;
        } catch (error) {
          throw new InternalServerErrorException('Failed to add company');
        }
      } else {
        // Find company by ID
        const company = await this.companyRepository.findOne({ where: { company_id: data.companyInfo.company_id } });
        if (company) {
          companyInfo.company_id = company;
        } else {
          return new NotFoundException('Company not found')
        }
      }
      await queryRunner.manager.save(CompanyInformationResponse, companyInfo);


      console.log(savedAioAnalysis)

      // Add DemographResponse
      await Promise.all(
        data.demograph.map(async (demographData) => {
          const demograph = new DemographResponse();
          demograph.parameter_name = demographData.parameter_name;
          demograph.result_value = demographData.result_value;
          demograph.selected_value = demographData.selected_value;
          demograph.aio_analysis_response_id = savedAioAnalysis;
          return await queryRunner.manager.save(DemographResponse, demograph);
        }),
      );

      // Add PsychographResponse
      await Promise.all(data.psychograph.map(async (psychographData: any) => {
        const psychograph = new PsychographResponse();
        psychograph.type = psychographData.type;
        psychograph.aio_analysis_response_id = savedAioAnalysis;
        psychograph.total_option = psychographData.total_option;
        const savedPsychograph = await queryRunner.manager.save(PsychographResponse, psychograph);
        await Promise.all(psychographData.psychograph_response_data.map((response: any) => {
          const psychographResponseData = new PsychographResponseData();
          psychographResponseData.selected_value = response.selected_value;
          psychographResponseData.psychograph_response_id = savedPsychograph;
          return queryRunner.manager.save(PsychographResponseData, psychographResponseData);
        }));
        return savedPsychograph;
      }));

      // Create ActivityHistory
      const activityHistory = new ActivityHistory();
      activityHistory.user_id = user; // Assign the user entity
      activityHistory.activity = `Add new AIO Analysis`;
      //Save the ActivityHistory
      await queryRunner.manager.save(ActivityHistory, activityHistory);
      await queryRunner.commitTransaction()
      return {
        success: true,
        message: 'Data saved successfully',
        data: savedAioAnalysis,
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to process and save data');
    } finally {
      await queryRunner.release();
    }
  }


  findAll() {
    return `This action returns all aioAnalysisResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aioAnalysisResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} aioAnalysisResponse`;
  }
}
