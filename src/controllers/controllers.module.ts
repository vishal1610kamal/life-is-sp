import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { ConsentManagementController } from './consent-management/consent-management.controller';
import { MSDSDocumentController } from './voyage-management/msds-document.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [
    ConsentManagementController,
    MSDSDocumentController
  ],
})
export class ControllersModule { }
