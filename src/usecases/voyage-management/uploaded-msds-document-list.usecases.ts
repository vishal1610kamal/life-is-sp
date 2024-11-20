import { HttpStatus } from "@nestjs/common";
import { UploadedMSDSDocumentListRequestDto, UploadedMSDSDocumentListResponseDto } from "@src/controllers/voyage-management/dto/uploaded-msds-document-list.dto";
import { UploadedMSDSDocumentListResponseDataDto } from "@src/controllers/voyage-management/dto/common.dto";
import { ILogger } from "@src/domain/logger/logger.interface";
import { errorConstants, MetaRequestPayload, ServiceProviderUrls, SPHeaders } from "@src/infrastructure/common/constants/constants";
import { HttpClientService } from "@src/infrastructure/services/http-service/http-client.service";
import { ExceptionsService } from "exception-handler-lib";

export class UploadedMsdsDocumentListUseCases {
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
    payload: UploadedMSDSDocumentListRequestDto
  ): Promise<any> {
    this.logger.log(`Uploaded MSDS Document List Request payload ${JSON.stringify(payload)}`);
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

    const msdsData: UploadedMSDSDocumentListResponseDataDto[] = ServiceProviderData?.data?.data;

    if (!msdsData) {
      this.exceptionsService.DataNotFoundException(
        {
          message: `${errorConstants.DT_ERR_00001[acceptLanguage.toUpperCase()]}`,
          code_error: 'DT_ERR_00001',
        },
        HttpStatus.OK,
      );
    }

    return new UploadedMSDSDocumentListResponseDto(ServiceProviderData?.data?.code, ServiceProviderData?.data?.messages, ServiceProviderData?.data?.status, msdsData);
  }
}
