import { PartialType } from '@nestjs/mapped-types';
import { CreateAioAnalysisResponseDto } from './create-aio-analysis-response.dto';

export class UpdateAioAnalysisResponseDto extends PartialType(CreateAioAnalysisResponseDto) {}
