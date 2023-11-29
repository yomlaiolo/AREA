import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './mongo/user.module';
import { AboutModule } from './about/about.module';

@Module({
  imports: [UserModule, AboutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
