import { II18nConfig, I18nBackendPath } from 'src/domain/config/i18n.interface';

export class I18nConfig implements II18nConfig {
  lng: string;
  initImmediate: boolean;
  debug: boolean;
  fallbackLng: string;
  preload: string[];
  ns: string;
  defaultNS: string;
  backend: I18nBackendPath;

  constructor() {
    this.lng = 'en';
    this.initImmediate = false;
    this.debug = true;
    this.fallbackLng = 'en';
    this.preload = ['en', 'ar'];
    this.ns = 'translation';
    this.defaultNS = 'translation';
    this.backend = {
      loadPath: 'src/infrastructure/common/i18n/{{lng}}/translation.json',
      addPath: 'src/infrastructure/common/i18n/{{lng}}/translation.json',
    };
  }
}
