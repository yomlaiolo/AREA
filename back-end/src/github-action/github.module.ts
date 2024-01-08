import { Module, forwardRef } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [HttpModule, ConfigModule, forwardRef(() => UsersModule)],
  controllers: [GithubController],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
