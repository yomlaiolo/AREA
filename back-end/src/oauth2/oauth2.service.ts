import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OAuth2Service {
  private readonly oauthConfig = {
    clientId:
      '871142138844-rm10amn21u0kkij3vs7fg1tusegnlni1.apps.googleusercontent.com',
    clientSecret: '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',
    authorizationUrl: 'https://oauth2-provider.com/authorize',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  };

  //https://accounts.google.com/o/oauth2/v2/auth?
  //redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground
  //&prompt=consent
  //&response_type=code
  //&client_id=871142138844-rm10amn21u0kkij3vs7fg1tusegnlni1.apps.googleusercontent.com
  //&scope=profile
  //&access_type=offline
  async getAccessToken(code: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('client_id', this.oauthConfig.clientId);
    params.append('client_secret', this.oauthConfig.clientSecret);
    params.append('access_type', 'offline');
    params.append('scope', 'https://www.googleapis.com/auth/userinfo.profile');
    // params.append('redirect_uri', 'http://localhost:8080/oauth2/callback');

    const query = `grant_type=authorization_code&
    code=${code}&
    client_id=${this.oauthConfig.clientId}&
    client_secret=${this.oauthConfig.clientSecret}&
    access_type=offline&
    scope=https://www.googleapis.com/auth/userinfo.profile`;

    console.log('params', query);
    const response = await axios.post(this.oauthConfig.tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('response', response);
    return response.data.access_token;
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const response = await axios.post(this.oauthConfig.tokenUrl, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.oauthConfig.clientId,
      client_secret: this.oauthConfig.clientSecret,
    });

    return response.data.access_token;
  }
}
