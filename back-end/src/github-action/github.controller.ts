import { Controller, Post, Body, Get, Put, Req } from '@nestjs/common';
import { GithubTokenDto, RepoSettingsDto } from './github.dto';
import { Public } from 'src/auth/auth.decorator';
import { GithubService } from './github.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  @Post('token')
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
  async getUser(@Req() request: Request) {
    const user = await this.usersService.findOneById(
      request['user']['user']['_id'],
    );
    return this.githubService.getGithubUser(user.github.access_token);
  }

  @Put('subscription')
  async subscribeToAll(
    @Body() repoSettings: RepoSettingsDto,
    @Req() request: Request,
  ) {
    const user = await this.usersService.findOneById(
      request['user']['user']['_id'],
    );
    return this.githubService.subscribeToRepo(
      user.github.username,
      repoSettings.repoName,
      user.github.access_token,
      this.configService.get<string>('WEBHOOK_URL'),
      repoSettings.eventsList,
    );
  }

  @Post('event')
  async createEvent(@Body() data: any, @Req() request: Request): Promise<void> {
    const user = await this.usersService.findOneById(
      request['user']['user']['_id'],
    );
    return this.githubService.createEvent(
      data.repoOwner,
      data.repoName,
      data.eventType,
      user.github.access_token,
      data.data,
    );
  }

  @Public()
  @Post('webhook')
  webhook(@Body() payload: any) {
    console.log('Webhook:', payload);
    return 'OK';
  }
}
