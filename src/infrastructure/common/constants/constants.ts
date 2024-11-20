import { EnvironmentConfigService } from '@src/infrastructure/config/environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';

const config = new EnvironmentConfigService(new ConfigService());

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum MODULE {
  NAME = 'consent-managment',
  NAME_UNDERSCORE = 'consent_managment',
  NAME_PLURAL = 'consent_managments',
  NAME_CAMEL_CASE = 'CONSENT-MANAGEMENT',
  NAME_CAMEL_CASE_PLURAL = 'Consent_Managment',
  PATH = 'consent',

}

export enum ENTITIES {
  BERTHBOOKING = 'Bookings',
  BERTHBOOKINGVISITS = 'BookingVisits',
  BERTHBOOKINGVISITSLOTOPERATORS = 'BookingVisitSlotOperators',
  BERTHBOOKINGVISITSCARGOITEMS = 'BookingVisitCargoItems',
  BERTHBOOKINGDOCUMENTS = 'BookingDocuments',
  INTERNATIONALIZATION = 'Internationalization',
  AUDITHISTORY = 'BookingAuditHistory',
}

export enum LocalizationKeys {
  MODULE_GET_SUCCESS = 'consent-mangment.get.success',

}




export const errorConstants = {
  DT_ERR_1001: {
    EN: 'consent definition not found',
  },
  DT_ERR_1002: {
    EN: 'consent definition fetched successfully',
  },

};

