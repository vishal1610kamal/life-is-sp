import { HttpStatus } from "@nestjs/common";
import { DownloadedMSDSDocumentRequestDto, DownloadedMSDSDocumentResponseDto } from "@src/controllers/voyage-management/dto/dowloaded-msds-document.dto";
import { ILogger } from "@src/domain/logger/logger.interface";
import { errorConstants, MetaRequestPayload, ServiceProviderUrls, SPHeaders } from "@src/infrastructure/common/constants/constants";
import { HttpClientService } from "@src/infrastructure/services/http-service/http-client.service";
import { ExceptionsService } from "exception-handler-lib";

export class DownloadedMsdsDocumentUseCases {
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
    payload: DownloadedMSDSDocumentRequestDto
  ): Promise<any> {
    this.logger.log(`Downloaded MSDS Document Request payload ${JSON.stringify(payload)}`);
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

    return new DownloadedMSDSDocumentResponseDto(ServiceProviderData?.data?.code, ServiceProviderData?.data?.messages, ServiceProviderData?.data?.type);
  }
}
