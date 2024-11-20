export interface II18nConfig {
  lng: string;
  initImmediate: boolean;
  debug: boolean;
  fallbackLng: string;
  preload: string[];
  ns: string;
  defaultNS: string;
  backend: I18nBackendPath;
}

export interface I18nBackendPath {
  loadPath: string;
  addPath: string;
}
