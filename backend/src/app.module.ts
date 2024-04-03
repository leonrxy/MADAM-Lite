import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DemographModule } from './master-data/demograph/demograph.module';
import { PsychographModule } from './master-data/psychograph/psychograph.module';
import { AioAnalysisResponseModule } from './data-analysis/aio-analysis/aio-analysis-response/aio-analysis-response.module';
import { CompanyModule } from './data-analysis/aio-analysis/company/company.module';
import { DemographResponseModule } from './data-analysis/aio-analysis/demograph-response/demograph-response.module';
import { CompanyInformationResponseModule } from './data-analysis/aio-analysis/company-information-response/company-information-response.module';
import { PsychographResponseDataModule } from './data-analysis/aio-analysis/psychograph-response-data/psychograph-response-data.module';
import { PsychographResponseModule } from './data-analysis/aio-analysis/psychograph-response/psychograph-response.module';
import { ActivityHistoryModule } from './activity-history/activity-history.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist', '**', '*.entity.js')],
        synchronize: true
      }),
    }),
    UsersModule,
    AuthModule,
    DemographModule,
    PsychographModule,
    DemographResponseModule,
    CompanyInformationResponseModule,
    AioAnalysisResponseModule,
    CompanyModule,
    PsychographResponseDataModule,
    PsychographResponseModule,
    ActivityHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
