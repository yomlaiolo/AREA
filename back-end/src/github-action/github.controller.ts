import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { GithubTokenDto, RepoSettingsDto } from './github.dto';
import { Public } from 'src/auth/auth.decorator';
import { GithubService } from './github.service';
import { UsersService } from 'src/users/users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { variableObject } from 'src/utils/variable_object';
import {
  createMapReaction,
  reactionConstructors,
} from 'src/area/services/services';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';

@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private usersService: UsersService,
    private readonly gDriveService: GDriveService,
    private readonly openAiService: OpenAIService,
  ) {}

  @Post('token')
  @ApiBearerAuth('access-token')
  async setToken(
    @Req() request: Request,
    @Body() githubTokenDto: GithubTokenDto,
  ) {
    const token = githubTokenDto.token;
    const id = request['user']['user']['_id'];
    this.githubService.getGithubUser(token).subscribe((data) => {
      const username = data['login'];
      this.usersService.setGithubUser(username, token, id);
    });
  }

  @Get('user')
  @ApiBearerAuth('access-token')
  async getUser(@Req() request: Request) {
    const user = await this.usersService.findOneById(
      request['user']['user']['_id'],
    );
    return this.githubService.getGithubUser(user.github.access_token);
  }

  @Delete('unsubscription')
  @ApiBearerAuth('access-token')
  async unsubscribeToRepo(
    @Body() repoSettings: RepoSettingsDto,
    @Req() request: Request,
  ) {
    const user = await this.usersService.findOneById(
      request['user']['user']['_id'],
    );
    await this.githubService.unsubscribeToRepo(
      user.github.username,
      repoSettings.repoName,
      user.github.access_token,
      user.github.webhooks[`${user.github.username}/${repoSettings.repoName}`],
    );
    this.usersService.removeWebhook(
      user.github.username,
      repoSettings.repoName,
    );
  }

  @Public()
  @Post('webhook/:uuid')
  async webhook(@Body() payload: any, @Param('uuid') uuid: string) {
    if ('hook' in payload) {
      this.usersService.addWebhookId(
        payload['repository']['owner']['login'],
        payload['repository']['name'],
        payload['hook']['id'],
      );
    } else if ('issue' in payload) {
      const user = await this.usersService.findOneByGithubUsername(
        payload['repository']['owner']['login'],
      );
      const reactionMap = createMapReaction(reactionConstructors);
      const repoUrl = `${payload['repository']['owner']['login']}/${payload['repository']['name']}`;
      const reaction = new reactionMap[
        user.github.webhooks[repoUrl]['reactionFunc']
          ? user.github.webhooks[repoUrl]['reactionFunc']
          : null
      ](
        variableObject(
          {
            repo: payload['repository']['name'],
            title: payload['issue']['title'],
            body: payload['issue']['body'],
          },
          user.github.webhooks[repoUrl]['actionData'],
          user.github.webhooks[repoUrl]['reactionData'],
        ),
        user,
        this.githubService,
        this.usersService,
        this.gDriveService,
        this.openAiService,
      );
      if (!reaction) throw new Error('Reaction not found');
      if (reaction.check()) reaction.exec();
      else console.log('Invalid reaction');
    } else if ('pull_request' in payload) {
      const user = await this.usersService.findOneByGithubUsername(
        payload['repository']['owner']['login'],
      );
      const reactionMap = createMapReaction(reactionConstructors);
      const repoUrl = `${payload['repository']['owner']['login']}/${payload['repository']['name']}`;
      const reaction = new reactionMap[
        user.github.webhooks[repoUrl]['reactionFunc']
          ? user.github.webhooks[repoUrl]['reactionFunc']
          : null
      ](
        variableObject(
          {
            repo: payload['repository']['name'],
            title: payload['pull_request']['title'],
            body: payload['pull_request']['body'],
            fromBranch: payload['pull_request']['head']['ref'],
            headBranch: payload['pull_request']['base']['ref'],
          },
          user.github.webhooks[repoUrl]['actionData'],
          user.github.webhooks[repoUrl]['reactionData'],
        ),
        user,
        this.githubService,
        this.usersService,
        this.gDriveService,
        this.openAiService,
      );
      if (!reaction) throw new Error('Reaction not found');
      if (reaction.check()) reaction.exec();
      else console.log('Invalid reaction');
    } else {
      console.log('Webhook:', payload);
    }
    return 'OK';
  }
}
