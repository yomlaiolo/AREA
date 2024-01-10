import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

import { actionConstructors, reactionConstructors } from '../area/services/services';

function createServicesAbout(): object[] {
  const servicesKey = [];
  const services = [];
  // for (const actionName in actionConstructors) {
  //   if (!(servicesKey.find(service => service == actionsList[actionName].service)))
  //     servicesKey.push(actionsList[actionName].service);
  // }
  // for (const reactionName in reactionsList) {
  //   if (!(servicesKey.find(service => service == reactionsList[reactionName].service)))
  //     servicesKey.push(reactionsList[reactionName].service);
  // }

  // servicesKey.forEach(serviceName => {
  //   const actions = [];
  //   const reactions = [];
  //   for (const actionName in actionsList) {
  //     if (actionsList[actionName].service != serviceName) continue;
  //     actions.push({
  //       name: actionName,
  //       description: actionsList[actionName].doc,
  //       example: actionsList[actionName].dataExample,
  //     });
  //   }
  //   for (const reactionName in reactionsList) {
  //     if (reactionsList[reactionName].service != serviceName) continue;
  //     reactions.push({
  //       name: reactionName,
  //       description: reactionsList[reactionName].doc,
  //       example: reactionsList[reactionName].dataExample,
  //     });
  //   }
  //   services.push({
  //     name: serviceName,
  //     actions: actions,
  //     reactions: reactions,
  //   });
  // });


  return services;
}

const about = createServicesAbout();

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
