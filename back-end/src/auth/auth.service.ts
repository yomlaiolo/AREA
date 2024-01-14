import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
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

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findOneById(userId);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      throw new UnauthorizedException("Invalid password");
    }
    const regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!regexPassword.test(newPassword)) {
      throw new NotAcceptableException("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number");
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(newPassword, salt);
    await this.usersService.updatePassword(userId, password);
  }

  async changeUsernameOrEmail(userId: string, changeUsernameOrEmailDto: any): Promise<void> {
    const user = await this.usersService.findOneById(userId);
    const regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");
    
    if (!user || !(await bcrypt.compare(changeUsernameOrEmailDto.password, user.password)))
      throw new UnauthorizedException("Invalid password");
    if (changeUsernameOrEmailDto.email != undefined && !regexEmail.test(changeUsernameOrEmailDto.email))
      throw new NotAcceptableException("Email is not valid");

    if (changeUsernameOrEmailDto.username != undefined)
      await this.usersService.updateUsername(userId, changeUsernameOrEmailDto.username);
    if (changeUsernameOrEmailDto.email != undefined)
      await this.usersService.updateEmail(userId, changeUsernameOrEmailDto.email);
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

  async getGoogleUserInfo(accessToken: string) {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Failed to get Google user info');
    }
  }
}