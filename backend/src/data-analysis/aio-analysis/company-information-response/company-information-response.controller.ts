import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyInformationResponseService } from './company-information-response.service';
import { CreateCompanyInformationResponseDto } from './dto/create-company-information-response.dto';
import { UpdateCompanyInformationResponseDto } from './dto/update-company-information-response.dto';

@Controller('company-information-response')
export class CompanyInformationResponseController {
  constructor(private readonly companyInformationResponseService: CompanyInformationResponseService) {}

  @Post()
  create(@Body() createCompanyInformationResponseDto: CreateCompanyInformationResponseDto) {
    return this.companyInformationResponseService.create(createCompanyInformationResponseDto);
  }

  @Get()
  findAll() {
    return this.companyInformationResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyInformationResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyInformationResponseDto: UpdateCompanyInformationResponseDto) {
    return this.companyInformationResponseService.update(+id, updateCompanyInformationResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyInformationResponseService.remove(+id);
  }
}
