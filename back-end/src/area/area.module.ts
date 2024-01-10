import { Module, forwardRef } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './area.schema';
import { UsersModule } from 'src/users/users.module';
import { GithubModule } from 'src/github-action/github.module';
import { OpenAIModule } from 'src/openai/openai.module';
import { GDriveModule } from 'src/gdrive/gdrive.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => GithubModule),
    forwardRef(() => OpenAIModule),
    forwardRef(() => GDriveModule),
  ],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
