import { CommonModel } from './common-module';
export class ConsentDefinitionsModel extends CommonModel {
  id: string;
  consent_id: string;
  lang_code: string;
  version: string;
  definition: string;
  expiry_date: string;
  is_active: boolean;
}
