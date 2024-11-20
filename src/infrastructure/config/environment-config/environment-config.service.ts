import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';
import { CacheConfig } from 'src/domain/config/cache.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig, CacheConfig {
  constructor(private configService: ConfigService) { }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabasePoolSize(): number {
    return this.configService.get<number>('DATABASE_POOL_SIZE');
  }

  getDatabaseCacheTTL(): number {
    return this.configService.get<number>('DATABASE_CACHE_TTL');
  }

  getDatabaseCacheType(): string {
    return this.configService.get<string>('DATABASE_CACHE_TYPE');
  }

  getDatabaseLogging(): string {
    return this.configService.get<string>('DATABASE_LOGGING');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getCacheHost(): string {
    return this.configService.get<string>('CACHE_HOST');
  }

  getCacheUsername(): string {
    return this.configService.get<string>('CACHE_USERNAME');
  }

  getCachePassword(): string {
    return this.configService.get<string>('CACHE_PASSWORD');
  }

  getCachePort(): number {
    return this.configService.get<number>('CACHE_PORT');
  }

  getCacheStore(): string {
    return this.configService.get<string>('CACHE_STORE');
  }

  getCacheTTL(): number {
    return this.configService.get<number>('CACHE_TTL');
  }

  getServiceProviderUrl(): string {
    return this.configService.get<string>('SERVICE_PROVIDER_API_URL');
  }

  getServiceProviderApiKey(): string {
    return this.configService.get<string>('SERVICE_PROVIDER_API_KEY');
  }

  getReportGenerationServiceUrl(): string {
    return this.configService.get<string>('REPORT_GENERATION_SERVICE_API_URL');
  }
}
