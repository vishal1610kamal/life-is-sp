export interface DatabaseConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getDatabaseSchema(): string;
  getDatabasePoolSize(): number;
  getDatabaseCacheTTL(): number;
  getDatabaseCacheType(): string;
  getDatabaseLogging(): string;
}
