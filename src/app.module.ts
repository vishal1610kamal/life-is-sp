import { Module, Scope } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ExceptionsModule } from 'exception-handler-lib';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './controllers/controllers.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { CacheLibModule, CacheLibService } from 'cache-lib';
import { LoggerLibModule } from 'logger-lib';
import { LoggerConfig } from './infrastructure/config/logger/logger.config';
import { I18nLibModule } from 'i18n-lib';
import { I18nConfig } from './infrastructure/config/i18n/logger.config';

@Module({
  imports: [
    PassportModule,
    JwtServiceModule,
    EnvironmentConfigModule,
    CacheLibModule,
    LoggerLibModule.register(new LoggerConfig()),
    ExceptionsModule,
    I18nLibModule.register(new I18nConfig()),
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    TypeOrmConfigModule,
  ],
  providers: [CacheLibService],
})
export class AppModule { }
