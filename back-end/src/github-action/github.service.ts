import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

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
}
