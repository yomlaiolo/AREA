import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import axios, { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class NasaService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  getPicturesOfTheDay(): Observable<string> {
    const apiKey = this.configService.get<string>('NASA_API');
    const picturesOfTheDay = this.http
      .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .pipe(map((response) => response.data.url));
    return picturesOfTheDay;
  }
}
