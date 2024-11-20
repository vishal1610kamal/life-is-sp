export interface CacheConfig {
  getCacheHost(): string;
  getCacheUsername(): string;
  getCachePassword(): string;
  getCachePort(): number;
  getCacheStore(): string;
  getCacheTTL(): number;
}
