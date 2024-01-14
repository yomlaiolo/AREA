import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

import { createAbout } from '../area/services/services';

const about = createAbout();

@ApiTags('about')
@Controller('about.json')
export class AboutController {
  @Public()
  @Get()
  getAbout(@Req() request: any): any {
    return {
      client: {
        host: request.headers.host,
      },
      server: {
        current_time: new Date().getTime(),
        services: about,
      },
    };
  }
}
