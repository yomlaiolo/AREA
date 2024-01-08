import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import axios, { AxiosError } from 'axios';

@Injectable()
export class GithubService {
  constructor(private http: HttpService) {}

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
    webhookUrl: string,
    eventsList: string[],
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
        url: webhookUrl,
        content_type: 'json',
      },
    };

    await axios.post(url, data, { headers });
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

    await axios.post(url, data, { headers });
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
