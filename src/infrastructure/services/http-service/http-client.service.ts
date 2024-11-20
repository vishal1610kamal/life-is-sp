import { Injectable } from '@nestjs/common';
import { LoggerService } from 'logger-lib';
import { EnvironmentConfigService } from '@src/infrastructure/config/environment-config/environment-config.service';
import axios from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class HttpClientService {
  private axiosInstance;

  constructor(
    private readonly logger: LoggerService,
    private readonly environmentConfigService: EnvironmentConfigService
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.environmentConfigService.getServiceProviderUrl(),
      headers: {
        'x-api-key': this.environmentConfigService.getServiceProviderApiKey(),
      },
    });

    // Configure axios-retry
    axiosRetry(this.axiosInstance, {
      retries: 1,
      retryDelay: (retryCount) => retryCount * 10000,
      retryCondition: (error) => error.response.status === 404,
      onRetry: (retryCount, error, requestConfig) => {
        this.logger.log(`Retrying request attempt ${retryCount}`);
      },
    });
  }

  async get(url: string, headers?: any) {
    this.logger.log(headers);
    return this.axiosInstance.get(url, { headers });
  }

  async post(url: string, payload: any, headers?: any) {
    this.logger.log(payload);
    this.logger.log(headers);
    return this.axiosInstance.post(url, payload, { headers });
  }
}
