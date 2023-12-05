import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './about/about.module';

@Module({
  imports: [AboutModule, MongooseModule.forRoot('mongodb://mongodb:27017')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
