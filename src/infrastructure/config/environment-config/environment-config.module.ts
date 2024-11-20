import { Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
import { validate } from './environment-config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: './env/local.env',
      ignoreEnvFile: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' ? false : true,
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule { }
