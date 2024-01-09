import { Module } from '@nestjs/common';
import { OAuth2Controller } from './oauth2.controller';
import { OAuth2Service } from './oauth2.service';

@Module({
  imports : [],
  controllers: [OAuth2Controller],
  providers: [OAuth2Service],
  exports: [OAuth2Service]
})
export class GoogleModule {}
