import { ConsentsModel } from '../model/consents.model';
import { Consents } from 'src/infrastructure/entities/consents.entity';


export interface IConsentsRepository {
  findByFunctionId(function_id: string): Promise<ConsentsModel>;
  entityToConsentsModelMapper(berthBookingEntityObject: Consents): ConsentsModel;
  consentsModelToEntityMapper(berthBookingModelObject: ConsentsModel): Consents;
}
