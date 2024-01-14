import { Module, forwardRef } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';
import { AreaModule } from 'src/area/area.module';
import { GDriveModule } from 'src/gdrive/gdrive.module';
import { OpenAIModule } from 'src/openai/openai.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UsersModule),
    forwardRef(() => AreaModule),
    forwardRef(() => GDriveModule),
    forwardRef(() => OpenAIModule),
  ],
  controllers: [GithubController],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
