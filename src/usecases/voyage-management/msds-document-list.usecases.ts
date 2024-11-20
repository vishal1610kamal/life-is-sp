import { HttpStatus } from "@nestjs/common";
import { MSDSDocumentUploadListRequestDto, MSDSDocumentUploadListResponseDto } from "@src/controllers/voyage-management/dto/msds-document-upload-list.dto";
import { MSDSDocumentUploadListResponseDataDto } from "@src/controllers/voyage-management/dto/common.dto";
import { ILogger } from "@src/domain/logger/logger.interface";
import { errorConstants, MetaRequestPayload, ServiceProviderUrls, SPHeaders } from "@src/infrastructure/common/constants/constants";
import { HttpClientService } from "@src/infrastructure/services/http-service/http-client.service";
import { ExceptionsService } from "exception-handler-lib";

export class MsdsDocumentListUseCases {
  constructor(
    public readonly logger: ILogger,
    public readonly exceptionsService: ExceptionsService,
    public readonly httpClientService: HttpClientService
  ) { }

  async execute(
    userAgent: string,
    username: string,
    acceptLanguage: string,
    XRequestId: string,
    TimeZone: string,
    payload: MSDSDocumentUploadListRequestDto
  ): Promise<any> {
    this.logger.log(`MSDS Document List Request payload ${JSON.stringify(payload)}`);
    this.logger.log(
      `userAgent: ${userAgent}, username: ${username}, acceptLanguage: ${acceptLanguage}, XRequestId: ${XRequestId}, TimeZone: ${TimeZone}`,
    );

    const ServiceProviderData = await this.httpClientService.post(ServiceProviderUrls.LIST_ROLLOVER_VALIDATE, { ...MetaRequestPayload, data: payload }, SPHeaders);
    if (ServiceProviderData?.status !== HttpStatus.OK) {
      this.exceptionsService.DataNotFoundException(
        {
          message: ServiceProviderData?.data?.message,
          code_error: 'DT_ERR_1015',
        },
        ServiceProviderData.status,
      );

    }

    const msdsData: MSDSDocumentUploadListResponseDataDto[] = ServiceProviderData?.data?.data;

    if (!msdsData) {
      this.exceptionsService.DataNotFoundException(
        {
          message: `${errorConstants.DT_ERR_00001[acceptLanguage.toUpperCase()]}`,
          code_error: 'DT_ERR_00001',
        },
        HttpStatus.OK,
      );
    }

    return new MSDSDocumentUploadListResponseDto(ServiceProviderData?.data?.code, ServiceProviderData?.data?.messages, ServiceProviderData?.data?.status, msdsData);
  }
}
