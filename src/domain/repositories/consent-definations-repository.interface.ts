import { ConsentDefinitionsModel } from '../model/consent-definitions.model';
import { ConsentDefinitions } from 'src/infrastructure/entities/consent-definitions.entity';


export interface IConsentDefinitionsRepository {
  findByConsentId(consent_id: string): Promise<ConsentDefinitionsModel>;
  entityToConsentDefinitionsModelMapper(berthBookingEntityObject: ConsentDefinitions): ConsentDefinitionsModel;
  consentDefinitionsModelToEntityMapper(berthBookingModelObject: ConsentDefinitionsModel): ConsentDefinitions;
}
