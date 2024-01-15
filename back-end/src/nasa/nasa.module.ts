import { Module, forwardRef } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';
import { AreaModule } from 'src/area/area.module';
import { GDriveModule } from 'src/gdrive/gdrive.module';
import { OpenAIModule } from 'src/openai/openai.module';
import { GMailModule } from 'src/gmail/gmail.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UsersModule),
    forwardRef(() => AreaModule),
    forwardRef(() => GDriveModule),
    forwardRef(() => OpenAIModule),
    forwardRef(() => GMailModule),
  ],
  providers: [NasaService],
  exports: [NasaService],
})
export class NasaModule {}
