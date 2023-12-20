import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@ApiTags('about')
@Controller('about.json')
export class AboutController {
  @Public()
  @Get()
  getAbout(@Req() request: any): any {
    console.log("About")
    return {
      client: {
        host: request.headers.host,
      },
      server: {
        current_time: new Date().getTime(),
        services: [
          {
            name: 'example',
            actions: [
              {
                name: 'first_action_example',
                description: 'Something incredible happens',
              },
              {
                name: 'second_action_example',
                description:
                  "Something pretty cool happens but it's different from the first action",
              },
            ],
            reactions: [
              {
                name: 'reaction_example',
                description:
                  'Something expected happens when the action is triggered',
              },
            ],
          },
        ],
      },
    };
  }
}
