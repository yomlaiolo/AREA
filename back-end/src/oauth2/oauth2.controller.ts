import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@Controller('oauth2')
export class OAuth2Controller {
  constructor(private readonly oauth2Service: OAuth2Service) {}

  @Public()
  @Post('get-access-token')
  @ApiTags('oauth2')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
        },
      },
    },
  })
  async getAccessToken(@Body('code') code: string): Promise<string> {
    return this.oauth2Service.getAccessToken(code);
  }

  @Public()
  @Post('refresh-access-token')
  async refreshAccessToken(@Body('refreshToken') refreshToken: string): Promise<string> {
    return this.oauth2Service.refreshAccessToken(refreshToken);
  }

  @Public()
  @Get('callback')
  async handleOAuthCallback(@Query('code') code: string): Promise<string> {
    console.log('code', code);
    // try {
    //   // You've received the authorization code as a query parameter
    //   // Exchange the code for an access token using your OAuth2Service
    //   const accessToken = await this.oauth2Service.getAccessToken(code);

    //   // You can use the accessToken to authenticate the user or perform actions in your app

    //   // Return a response or redirect as needed
    //   return `Access Token: ${accessToken}`;
    // } catch (error) {
    //   // Handle errors gracefully, e.g., redirect to an error page or return an error response
    //   return `Error: ${error.message}`;
    // }
    return 'callback';
  }
}
