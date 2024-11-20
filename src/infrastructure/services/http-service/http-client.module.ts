import { Module } from '@nestjs/common';
import { AxiosRetryModule } from 'nestjs-axios-retry';
import { HttpClientService } from './http-client.service';
import { EnvironmentConfigService } from '@src/infrastructure/config/environment-config/environment-config.service';

@Module({
  providers: [HttpClientService, EnvironmentConfigService],
  exports: [HttpClientService],
})
export class HttpClientModule { }
