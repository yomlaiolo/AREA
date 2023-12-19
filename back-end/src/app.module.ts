import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './about/about.module';

import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';

import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { GithubModule } from './github-action/github.module';
import { OpenAIModule } from './openai/openai.module';
import { AreaModule } from './area/area.module';
import { CronActionModule } from './cron-action/cron-action.module';
import { CronActionController } from './cron-action/cron-action.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    AboutModule,
    JwtModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_CONNECTION_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    GithubModule,
    OpenAIModule,
    AreaModule,
    CronActionModule,
  ],
  controllers: [AppController, CronActionController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
