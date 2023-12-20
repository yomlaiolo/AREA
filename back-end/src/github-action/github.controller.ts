import { Controller, Post, Body } from '@nestjs/common';
import { GithubTokenDto } from './github.dto';

@Controller('github')
export class GithubController {
  @Post('token')
  setToken(@Body() githubTokenDto: GithubTokenDto) {
    const token = githubTokenDto.token;
    console.log('Back: ' + token);
  }
}
