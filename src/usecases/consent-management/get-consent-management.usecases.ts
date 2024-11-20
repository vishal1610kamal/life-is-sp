import { ILogger } from '@domain/logger/logger.interface';
import { IConsentsRepository } from '@src/domain/repositories/consent-repository.interface';
import { IConsentDefinitionsRepository } from '@src/domain/repositories/consent-definations-repository.interface';
import { GetConsentManagementResponseDto } from '@src/controllers/consent-management/dto/get-consent-management.dto';
import { ConsentManagementDto } from '@src/controllers/consent-management/dto/common.dto';
import { ExceptionsService } from 'exception-handler-lib';
import { StaticMessageDto } from '@src/controllers/consent-management/dto/static-message.dto';
import { errorConstants } from '@infrastructure/common/constants/constants';


export class GetConsentManagementUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly consentsRepository: IConsentsRepository,
    private readonly consentDefinitionsRepository: IConsentDefinitionsRepository,
    private readonly exceptionsService: ExceptionsService,
  ) { }

  async execute(function_id: string, TimeZone: string, userAgent: string, username: string, acceptLanguage: string, XRequestId: string): Promise<GetConsentManagementResponseDto> {
    this.logger.log(`GetConsentManagementUseCases execute: Fetch Consent Definitions ${function_id}`);

    const consentData = await this.consentsRepository.findByFunctionId(function_id);
    if (!consentData?.id) {
      this.exceptionsService.DataNotFoundException({
        message: `${errorConstants.DT_ERR_1001[acceptLanguage.toUpperCase()]}`,
        code_error: 'DT_ERR_1001',
      });
    }

    const consentDefinationData = await this.consentDefinitionsRepository.findByConsentId(consentData?.id);
    return this.createSuccessResponse(consentData?.id, consentDefinationData?.version, consentDefinationData?.definition);
  }

  private createSuccessResponse(consent_id: string, consent_version: string, definition: string): GetConsentManagementResponseDto {
    const responseMessage: StaticMessageDto[] = [
      {
        code: 'DT_INFO_1002',
        message: `${errorConstants.DT_ERR_1002.EN}`,
        type: 'Success',
      },
    ];

    const response: ConsentManagementDto = {
      consent_id: consent_id,
      consent_version: consent_version,
      definition: definition
    };

    return new GetConsentManagementResponseDto(responseMessage, response);
  }
}
