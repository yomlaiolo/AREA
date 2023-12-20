import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { GithubTokenDto } from './github.dto';
import { Public } from 'src/auth/auth.decorator';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  private token: string;
  @Public()
  @Post('token')
  setToken(@Body() githubTokenDto: GithubTokenDto) {
    this.token = githubTokenDto.token;
    console.log('Back: ' + this.token);
  }
}
