import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import axios, { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  getGithubUser(token: string) {
    const headersRequest = {
      Authorization: `token ${token}`,
      'User-Agent': 'ForgeFlow',
    };

    return this.http
      .get('https://api.github.com/user', { headers: headersRequest })
      .pipe(map((response) => response.data));
  }

  async subscribeToRepo(
    repoOwner: string,
    repoName: string,
    accessToken: string,
    eventsList: string[],
    webhookId: string,
  ) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/hooks`;
    const headers = {
      Authorization: `token ${accessToken}`,
      'User-Agent': 'ForgeFlow',
    };

    const data = {
      name: 'web',
      active: true,
      events: eventsList,
      config: {
        url: this.configService.get<string>('WEBHOOK_URL') + '/' + webhookId,
        content_type: 'json',
        insecure_ssl: '0',
      },
    };

    try {
      await axios.post(url, data, { headers });
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async unsubscribeToRepo(
    repoOwner: string,
    repoName: string,
    accessToken: string,
    webhookId: string,
  ) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/hooks/${webhookId}`;
    const headers = {
      Authorization: `token ${accessToken}`,
      'User-Agent': 'ForgeFlow',
    };

    await axios.delete(url, { headers });
  }

  async createEvent(
    repoOwner: string,
    repoName: string,
    eventType: string,
    accessToken: string,
    data: any,
  ): Promise<void> {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/${eventType}`;
    const headers = {
      Authorization: `token ${accessToken}`,
      'User-Agent': 'ForgeFlow',
    };
    try {
      await axios.post(url, data, { headers });
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async checkTokenValidity(accessToken: string): Promise<boolean> {
    const url = `https://api.github.com/user`;
    const headers = {
      Authorization: `token ${accessToken}`,
      'User-Agent': 'ForgeFlow',
    };

    try {
      await axios.get(url, { headers });
      return true;
    } catch (error) {
      if (error.isAxiosError === false) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          return false;
        }
      }
    }
  }
}
