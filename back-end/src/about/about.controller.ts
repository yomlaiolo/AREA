import { Controller, Get, Req } from '@nestjs/common';

@Controller('about.json')
export class AboutController {
  @Get()
  getAbout(@Req() request: any): any {
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
