import { Controller, Inject, Version, Headers, Body, Post, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MODULE } from "@src/infrastructure/common/constants/constants";
import { ApiResponseType } from "@src/infrastructure/common/swagger/response.decorator";
import { UseCaseProxy } from '@src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from "@src/infrastructure/usecases-proxy/usecases-proxy.module";
import { In } from 'typeorm';
import { MSDSDocumentUploadListRequestDto, MSDSDocumentUploadListResponseDto } from './dto/msds-document-upload-list.dto';
import { MSDSDocumentUploadSubmitRequestDto, MSDSDocumentUploadSubmitResponseDto } from './dto/msds-document-upload-submit.dto';
import { UploadedMSDSDocumentListRequestDto, UploadedMSDSDocumentListResponseDto } from './dto/uploaded-msds-document-list.dto';
import { DeleteMSDSDocumentRequestDto, DeleteMSDSDocumentResponseDto } from './dto/delete-msds-document.dto';
import { DownloadedMSDSDocumentRequestDto, DownloadedMSDSDocumentResponseDto } from './dto/dowloaded-msds-document.dto';
import { MsdsDocumentListUseCases } from '@src/usecases/voyage-management/msds-document-list.usecases';
import { MsdsDocumentSubmitUseCases } from '@src/usecases/voyage-management/msds-document-submit.usecases';
import { UploadedMsdsDocumentListUseCases } from '@src/usecases/voyage-management/uploaded-msds-document-list.usecases';
import { DeteleMsdsDocumentUseCases } from '@src/usecases/voyage-management/delete-msds-document.usecases';
import { DownloadedMsdsDocumentUseCases } from '@src/usecases/voyage-management/downloaded-msds-document.usecases';

@Controller({
  version: ['1', '2'],
  path: MODULE.PATH
})
@ApiTags(MODULE.NAME_CAMEL_CASE)
@ApiResponse({ status: 500, description: 'Internal error' })
export class MSDSDocumentController {

  constructor(

    @Inject(UsecasesProxyModule.POST_MSDS_DOCUMENT_LIST_USECASES_PROXY)
    public readonly postMsdsDocumentListUseCasesProxy: UseCaseProxy<MsdsDocumentListUseCases>,

    @Inject(UsecasesProxyModule.POST_MSDS_DOCUMENT_SUBMIT_USECASES_PROXY)
    public readonly postMsdsDocumentSubmitUseCasesProxy: UseCaseProxy<MsdsDocumentSubmitUseCases>,

    @Inject(UsecasesProxyModule.POST_UPLOADED_MSDS_DOCUMENT_USECASES_PROXY)
    public readonly postUploadedMsdsDocumentUseCasesProxy: UseCaseProxy<UploadedMsdsDocumentListUseCases>,

    @Inject(UsecasesProxyModule.POST_DELETE_MSDS_DOCUMENT_USECASES_PROXY)
    public readonly postDeleteMsdsDocumentUseCasesProxy: UseCaseProxy<DeteleMsdsDocumentUseCases>,

    @Inject(UsecasesProxyModule.POST_DOWNLOADED_MSDS_DOCUMENT_USECASES_PROXY)
    public readonly postDownloadedMsdsDocumentUseCasesProxy: UseCaseProxy<DownloadedMsdsDocumentUseCases>

  ) { }

  @ApiOperation({
    summary:
      'This API endpoint validate list rollover data for the specified rotation number.',
  })

  @Version('1')
  @Post(`/document/list`)
  @HttpCode(200)
  @ApiBody({ type: MSDSDocumentUploadListRequestDto })
  @ApiResponseType(MSDSDocumentUploadListResponseDto, true)
  async DocumentList(
    @Headers('User-Agent') userAgent: string,
    @Headers('x-user-name') username: string,
    @Headers('Accept-Language') acceptLanguage: string,
    @Headers('X-Request-Id') XRequestId: string,
    @Headers('Timezone') TimeZone: string,
    @Body() payload: MSDSDocumentUploadListRequestDto,
  ) {
    return await this.postMsdsDocumentListUseCasesProxy
      .getInstance()
      .execute(userAgent, username, acceptLanguage, XRequestId, TimeZone, payload);
  }

  @ApiOperation({
    summary:
      'This API endpoint validate list rollover data for the specified rotation number.',
  })

  @Version('1')
  @Post(`/document/submit`)
  @HttpCode(200)
  @ApiBody({ type: MSDSDocumentUploadSubmitRequestDto })
  @ApiResponseType(MSDSDocumentUploadSubmitResponseDto, true)
  async DocumentSubmit(
    @Headers('User-Agent') userAgent: string,
    @Headers('x-user-name') username: string,
    @Headers('Accept-Language') acceptLanguage: string,
    @Headers('X-Request-Id') XRequestId: string,
    @Headers('Timezone') TimeZone: string,
    @Body() payload: MSDSDocumentUploadSubmitRequestDto,
  ) {
    return await this.postMsdsDocumentSubmitUseCasesProxy
      .getInstance()
      .execute(userAgent, username, acceptLanguage, XRequestId, TimeZone, payload);
  }

  @ApiOperation({
    summary:
      'This API endpoint validate list rollover data for the specified rotation number.',
  })

  @Version('1')
  @Post(`/uploaded/document/list`)
  @HttpCode(200)
  @ApiBody({ type: UploadedMSDSDocumentListRequestDto })
  @ApiResponseType(UploadedMSDSDocumentListResponseDto, true)
  async UploadDocumentList(
    @Headers('User-Agent') userAgent: string,
    @Headers('x-user-name') username: string,
    @Headers('Accept-Language') acceptLanguage: string,
    @Headers('X-Request-Id') XRequestId: string,
    @Headers('Timezone') TimeZone: string,
    @Body() payload: UploadedMSDSDocumentListRequestDto,
  ) {
      return await this.postUploadedMsdsDocumentUseCasesProxy
      .getInstance()
      .execute(userAgent, username, acceptLanguage, XRequestId, TimeZone, payload);
  }

  @ApiOperation({
    summary:
      'This API endpoint validate list rollover data for the specified rotation number.',
  })

  @Version('1')
  @Post(`/delete/document`)
  @HttpCode(200)
  @ApiBody({ type: DeleteMSDSDocumentRequestDto })
  @ApiResponseType(DeleteMSDSDocumentResponseDto, true)
  async DeleteDocument(
    @Headers('User-Agent') userAgent: string,
    @Headers('x-user-name') username: string,
    @Headers('Accept-Language') acceptLanguage: string,
    @Headers('X-Request-Id') XRequestId: string,
    @Headers('Timezone') TimeZone: string,
    @Body() payload: DeleteMSDSDocumentRequestDto,
  ) {
    return await this.postDeleteMsdsDocumentUseCasesProxy
      .getInstance()
      .execute(userAgent, username, acceptLanguage, XRequestId, TimeZone, payload);
  }

  @ApiOperation({
    summary:
      'This API endpoint validate list rollover data for the specified rotation number.',
  })

  @Version('1')
  @Post(`/downloaded/document`)
  @HttpCode(200)
  @ApiBody({ type: DownloadedMSDSDocumentRequestDto })
  @ApiResponseType(DownloadedMSDSDocumentResponseDto, true)
  async DownloadedDocument(
    @Headers('User-Agent') userAgent: string,
    @Headers('x-user-name') username: string,
    @Headers('Accept-Language') acceptLanguage: string,
    @Headers('X-Request-Id') XRequestId: string,
    @Headers('Timezone') TimeZone: string,
    @Body() payload: DownloadedMSDSDocumentRequestDto,
  ) {
    return await this.postDownloadedMsdsDocumentUseCasesProxy
      .getInstance()
      .execute(userAgent, username, acceptLanguage, XRequestId, TimeZone, payload);
  }


}

