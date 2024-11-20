import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { LoggerLibModule } from 'logger-lib';
import { HttpModule } from '@nestjs/axios';

import { DatabaseConsentDefinitionsRepository } from './consent-definitions.repository';
import { DatabaseConsentRepository } from './consents.repository';
import { ConsentDefinitions } from '../entities/consent-definitions.entity';
import { Consents } from '../entities/consents.entity';


@Module({
    imports: [
        HttpModule,
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([ConsentDefinitions, Consents]),
        LoggerLibModule,
    ],
    providers: [
        DatabaseConsentDefinitionsRepository,
        DatabaseConsentRepository
    ],
    exports: [
        DatabaseConsentDefinitionsRepository,
        DatabaseConsentRepository

    ],
})
export class RepositoriesModule { }

