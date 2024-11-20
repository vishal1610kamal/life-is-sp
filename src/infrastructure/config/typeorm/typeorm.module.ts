import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true,//config.getDatabaseSync() ?? false,
  schema: config.getDatabaseSchema(),
  poolSize: config.getDatabasePoolSize(),
  logging: false,//config.getDatabaseLogging(),
  cache: {
    duration: config.getDatabaseCacheTTL(),
    type: config.getDatabaseCacheType(),
    options: {
      host: config.getCacheHost(),
      port: config.getCachePort(),
      username: config.getCacheUsername(),
      password: config.getCachePassword(),
    },
  },
}) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule { }
