import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { user };
    return {
      access_token: await this.getJwt(payload),
    };
  }

  async getJwt(payload: any) {
    return await this.jwtService.signAsync(payload);
  }

  async getGoogleTokens(code: string): Promise<object> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', '871142138844-rm10amn21u0kkij3vs7fg1tusegnlni1.apps.googleusercontent.com');
    params.append('client_secret', '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');
    params.append('grant_type', 'authorization_code');
    params.append('access_type', 'offline');


    try {
      const response = await axios.post(tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Failed to get Google access token');
    }
  }

  async checkGoogleTokenValidity(accessToken: string) {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
      const data = response.data;

      // Check if the token is valid
      if (data.aud && data.exp && Date.now() < data.exp * 1000) {
        return { valid: true, data };
      } else {
        return { valid: false, data: null };
      }
    } catch (error) {
      console.error('Error validating token:', error);
      return { valid: false, data: null };
    }
  }
}