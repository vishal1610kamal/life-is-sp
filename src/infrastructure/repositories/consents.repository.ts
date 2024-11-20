import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConsentsModel } from '../../domain/model/consents.model';
import { IConsentsRepository } from '../../domain/repositories/consent-repository.interface';
import { Consents } from '../entities/consents.entity';
import { REQUEST } from '@nestjs/core';
import { BaseRepository } from './base.repository';
import { FastifyRequest } from 'fastify';
import { LoggerService } from 'logger-lib';


@Injectable({ scope: Scope.REQUEST })
export class DatabaseConsentRepository extends BaseRepository implements IConsentsRepository {
  constructor(
    dataSource: DataSource,
    @Inject(REQUEST) req: FastifyRequest,
    logger: LoggerService,
  ) {
    super(dataSource, req, logger);
  }

  async findByFunctionId(function_id: string): Promise<ConsentsModel> {
    this.logger.log('findByFunctionId repository execute : Getting Consent by Function Id');
    const consentEntity = await this.getRepository(Consents).findOne({
      where: { function_id: function_id },
      cache: true,
    });
    if (!consentEntity) {
      throw new NotFoundException(`Consent not found for function id ${function_id}`);
    }
    return this.entityToConsentsModelMapper(consentEntity);
  }

  entityToConsentsModelMapper(entityObject: Consents): ConsentsModel {
    const consentbject: ConsentsModel = new ConsentsModel();
    consentbject.id = entityObject.id ?? '';
    consentbject.function_id = entityObject.function_id ?? '';
    consentbject.service = entityObject.service ?? '';
    consentbject.description = entityObject.description ?? '';
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

  consentsModelToEntityMapper(modelObject: ConsentsModel): Consents {
    const consentEntity: Consents = new Consents();
    consentEntity.id = modelObject.id;
    consentEntity.function_id = modelObject.function_id;
    consentEntity.service = modelObject.service;
    consentEntity.description = modelObject.description;
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
