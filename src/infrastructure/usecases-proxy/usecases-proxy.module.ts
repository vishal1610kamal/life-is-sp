import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService, LoggerLibModule } from 'logger-lib';
import { CacheLibModule } from 'cache-lib';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { ExceptionsService, ExceptionsModule } from 'exception-handler-lib';
import { HttpModule } from '@nestjs/axios';
import { GetConsentManagementUseCases } from '@usecases/consent-management/get-consent-management.usecases';
import { DatabaseConsentRepository } from '../repositories/consents.repository';
import { DatabaseConsentDefinitionsRepository } from '../repositories/consent-definitions.repository';
import { HttpClientService } from '../services/http-service/http-client.service';
import { HttpClientModule } from '../services/http-service/http-client.module';
import { MsdsDocumentListUseCases } from '@usecases/voyage-management/msds-document-list.usecases';
import { MsdsDocumentSubmitUseCases } from '@usecases/voyage-management/msds-document-submit.usecases';
import { UploadedMsdsDocumentListUseCases } from '@usecases/voyage-management/uploaded-msds-document-list.usecases';
import { DeteleMsdsDocumentUseCases } from '@usecases/voyage-management/delete-msds-document.usecases';
import { DownloadedMsdsDocumentUseCases } from '@usecases/voyage-management/downloaded-msds-document.usecases';
@Module({
    imports: [
        LoggerLibModule,
        JwtModule,
        BcryptModule,
        EnvironmentConfigModule,
        RepositoriesModule,
        ExceptionsModule,
        HttpModule,
        HttpClientModule
    ],
})
export class UsecasesProxyModule {
    public static readonly GET_CONSENT_DEFINITION_USECASES_PROXY = 'getConsentDefinitionUsecaseProxy';
    public static readonly POST_MSDS_DOCUMENT_LIST_USECASES_PROXY = 'postMsdsDocumentListUseCasesProxy';
    public static readonly POST_MSDS_DOCUMENT_SUBMIT_USECASES_PROXY = 'postMsdsDocumentSubmitUseCasesProxy';
    public static readonly POST_UPLOADED_MSDS_DOCUMENT_USECASES_PROXY = 'postUploadedMsdsDocumentUseCasesProxy';
    public static readonly POST_DELETE_MSDS_DOCUMENT_USECASES_PROXY = 'postDeleteMsdsDocumentUseCasesProxy';
    public static readonly POST_DOWNLOADED_MSDS_DOCUMENT_USECASES_PROXY = 'postDownloadedMsdsDocumentUseCasesProxy';

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            imports: [CacheLibModule, ExceptionsModule],
            providers: [
                {
                    inject: [
                        LoggerService,
                        DatabaseConsentRepository,
                        DatabaseConsentDefinitionsRepository,
                        ExceptionsService,
                    ],
                    provide: UsecasesProxyModule.GET_CONSENT_DEFINITION_USECASES_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        consentRepository: DatabaseConsentRepository,
                        consentDefinitionsRepository: DatabaseConsentDefinitionsRepository,
                        exceptionsService: ExceptionsService,
                    ) =>
                        new UseCaseProxy(
                            new GetConsentManagementUseCases(
                                logger,
                                consentRepository,
                                consentDefinitionsRepository,
                                exceptionsService,
                            ),
                        ),
                },
              {
                inject: [
                  LoggerService,
                  HttpClientService,
                  ExceptionsService,
                ],
                provide: UsecasesProxyModule.POST_MSDS_DOCUMENT_LIST_USECASES_PROXY,
                useFactory: (
                  logger: LoggerService,
                  httpClientService: HttpClientService,
                  exceptionsService: ExceptionsService,
                ) =>
                  new UseCaseProxy(
                    new MsdsDocumentListUseCases(
                      logger,
                      exceptionsService,
                      httpClientService
                    ),
                  ),
              },
              {
                inject: [
                  LoggerService,
                  HttpClientService,
                  ExceptionsService,
                ],
                provide: UsecasesProxyModule.POST_MSDS_DOCUMENT_SUBMIT_USECASES_PROXY,
                useFactory: (
                  logger: LoggerService,
                  httpClientService: HttpClientService,
                  exceptionsService: ExceptionsService,
                ) =>
                  new UseCaseProxy(
                    new MsdsDocumentSubmitUseCases(
                      logger,
                      exceptionsService,
                      httpClientService
                    ),
                  ),
              },
              {
                inject: [
                  LoggerService,
                  HttpClientService,
                  ExceptionsService,
                ],
                provide: UsecasesProxyModule.POST_UPLOADED_MSDS_DOCUMENT_USECASES_PROXY,
                useFactory: (
                  logger: LoggerService,
                  httpClientService: HttpClientService,
                  exceptionsService: ExceptionsService,
                ) =>
                  new UseCaseProxy(
                    new UploadedMsdsDocumentListUseCases(
                      logger,
                      exceptionsService,
                      httpClientService
                    ),
                  ),
              },
              {
                inject: [
                  LoggerService,
                  HttpClientService,
                  ExceptionsService,
                ],
                provide: UsecasesProxyModule.POST_DELETE_MSDS_DOCUMENT_USECASES_PROXY,
                useFactory: (
                  logger: LoggerService,
                  httpClientService: HttpClientService,
                  exceptionsService: ExceptionsService,
                ) =>
                  new UseCaseProxy(
                    new DeteleMsdsDocumentUseCases(
                      logger,
                      exceptionsService,
                      httpClientService
                    ),
                  ),
              },
              {
                inject: [
                  LoggerService,
                  HttpClientService,
                  ExceptionsService,
                ],
                provide: UsecasesProxyModule.POST_DOWNLOADED_MSDS_DOCUMENT_USECASES_PROXY,
                useFactory: (
                  logger: LoggerService,
                  httpClientService: HttpClientService,
                  exceptionsService: ExceptionsService,
                ) =>
                  new UseCaseProxy(
                    new DownloadedMsdsDocumentUseCases(
                      logger,
                      exceptionsService,
                      httpClientService
                    ),
                  ),
              },
            ],
            exports: [
              UsecasesProxyModule.GET_CONSENT_DEFINITION_USECASES_PROXY,
              UsecasesProxyModule.POST_MSDS_DOCUMENT_LIST_USECASES_PROXY,
              UsecasesProxyModule.POST_MSDS_DOCUMENT_SUBMIT_USECASES_PROXY,
              UsecasesProxyModule.POST_UPLOADED_MSDS_DOCUMENT_USECASES_PROXY,
              UsecasesProxyModule.POST_DELETE_MSDS_DOCUMENT_USECASES_PROXY,
              UsecasesProxyModule.POST_DOWNLOADED_MSDS_DOCUMENT_USECASES_PROXY
            ],
        };
    }
}
