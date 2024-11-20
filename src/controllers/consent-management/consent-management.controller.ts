import { Controller, Get, Inject, Param, Headers, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { GetConsentManagementUseCases } from '@usecases/consent-management/get-consent-management.usecases';
import { GetConsentManagementResponseDto } from './dto/get-consent-management.dto';
import { MODULE } from '@src/infrastructure/common/constants/constants';

@Controller({
  version: ['1', '2'],
  path: '/',
})
@ApiTags(MODULE.NAME_CAMEL_CASE)
@ApiResponse({ status: 500, description: 'Internal error' })
export class ConsentManagementController {
  constructor(
    @Inject(UsecasesProxyModule.GET_CONSENT_DEFINITION_USECASES_PROXY)
    private readonly getConsentDefinationUsecaseProxy: UseCaseProxy<GetConsentManagementUseCases>,
  ) { }

  @ApiOperation({ summary: 'This api endpoint provides details of consent defination' })
  @ApiResponseType(GetConsentManagementResponseDto, false)
  @Version('1')
  @Get(`/definition/:function_id`)
  async getConsentDefination(
    @Param('function_id') function_id: string,
    @Headers('Timezone') TimeZone: string,
    @Headers('User-Agent') userAgent: string,
    @Headers('x-user-name') username: string,
    @Headers('Accept-Language') acceptLanguage: string,
    @Headers('X-Request-ID') XRequestId: string,
  ) {
    return await this.getConsentDefinationUsecaseProxy
      .getInstance()
      .execute(function_id, TimeZone, userAgent, username, acceptLanguage, XRequestId);
  }
}
