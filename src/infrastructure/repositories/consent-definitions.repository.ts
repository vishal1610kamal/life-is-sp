import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConsentDefinitionsModel } from '../../domain/model/consent-definitions.model';
import { IConsentDefinitionsRepository } from '../../domain/repositories/consent-definations-repository.interface';
import { ConsentDefinitions } from '../entities/consent-definitions.entity';
import { REQUEST } from '@nestjs/core';
import { BaseRepository } from './base.repository';
import { FastifyRequest } from 'fastify';
import { LoggerService } from 'logger-lib';


@Injectable({ scope: Scope.REQUEST })
export class DatabaseConsentDefinitionsRepository extends BaseRepository implements IConsentDefinitionsRepository {
  constructor(
    dataSource: DataSource,
    @Inject(REQUEST) req: FastifyRequest,
    logger: LoggerService,
  ) {
    super(dataSource, req, logger);
  }

  async findByConsentId(consent_id: string): Promise<ConsentDefinitionsModel> {
    this.logger.log('findByFunctionId repository execute : Getting Consent by Function Id');
    const consentEntity = await this.getRepository(ConsentDefinitions).findOne({
      where: { consent_id: consent_id },
      cache: true,
    });
    if (!consentEntity) {
      throw new NotFoundException(`Consent not found for function id ${consent_id}`);
    }
    return this.entityToConsentDefinitionsModelMapper(consentEntity);
  }

  entityToConsentDefinitionsModelMapper(entityObject: ConsentDefinitions): ConsentDefinitionsModel {
    const consentbject: ConsentDefinitionsModel = new ConsentDefinitionsModel();
    consentbject.id = entityObject.id ?? '';
    consentbject.consent_id = entityObject.consent_id ?? '';
    consentbject.lang_code = entityObject.lang_code ?? '';
    consentbject.version = entityObject.version ?? '';
    consentbject.definition = entityObject.definition ?? '';
    consentbject.expiry_date = entityObject.expiry_date ?? '';
    consentbject.is_active = entityObject.is_active ?? false;
    consentbject.created_by = entityObject.created_by ?? '';
    consentbject.created_date = entityObject.created_date;
    consentbject.updated_by = entityObject.updated_by ?? '';
    consentbject.updated_date = entityObject.updated_date;
    consentbject.deleted_by = entityObject.deleted_by ?? '';
    consentbject.deleted_date = entityObject.deleted_date;
    consentbject.is_deleted = entityObject.is_deleted ?? false;
    consentbject.user_ip = entityObject.user_ip ?? '';
    consentbject.user_agent = entityObject.user_agent ?? '';
    return consentbject;
  }

  consentDefinitionsModelToEntityMapper(modelObject: ConsentDefinitionsModel): ConsentDefinitions {
    const consentEntity: ConsentDefinitions = new ConsentDefinitions();
    consentEntity.id = modelObject.id;
    consentEntity.consent_id = modelObject.consent_id;
    consentEntity.lang_code = modelObject.lang_code;
    consentEntity.version = modelObject.version;
    consentEntity.definition = modelObject.definition;
    consentEntity.expiry_date = modelObject.expiry_date;
    consentEntity.is_active = modelObject.is_active;
    consentEntity.created_by = modelObject.created_by;
    consentEntity.created_date = modelObject.created_date;
    consentEntity.updated_by = modelObject.updated_by;
    consentEntity.updated_date = modelObject.updated_date;
    consentEntity.deleted_by = modelObject.deleted_by;
    consentEntity.deleted_date = modelObject.deleted_date;
    consentEntity.is_deleted = modelObject.is_deleted;
    consentEntity.user_ip = modelObject.user_ip;
    consentEntity.user_agent = modelObject.user_agent;
    return consentEntity;
  }

}
