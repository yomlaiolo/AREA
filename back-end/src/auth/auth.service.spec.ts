import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.schema';

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                UsersService,
                JwtService,
                {
                    provide: getModelToken('User'),
                    useValue: {}
                }
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('signIn', () => {
        it('should return a JWT token if the email and password are valid', async () => {
            // Mock the necessary dependencies
            const mockEmail = 'test@example.com';
            const mockPassword = 'password';
            const mockUser: User = {
                email: mockEmail,
                password: await bcrypt.hash(mockPassword, 10),
                username: 'mockUsername',
                is_google_oauth: false,
                access_token: 'mockAccessToken',
                refresh_token: 'mockRefreshToken',
            };
            jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(mockUser as User | Promise<User>);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(Promise.resolve(true) as never);
            jest.spyOn(jwtService, 'signAsync').mockReturnValue('mockToken' as never);

            // Call the signIn method
            const result = await authService.signIn(mockEmail, mockPassword);

            // Assert that a JWT token is returned
            expect(result).toEqual({ access_token: 'mockToken' });
        });

        it('should throw an UnauthorizedException if the email or password is invalid', async () => {
            // Mock the necessary dependencies
            const mockEmail = 'test@example.com';
            const mockPassword = 'password';
            jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

            // Call the signIn method and expect it to throw an UnauthorizedException
            await expect(authService.signIn(mockEmail, mockPassword)).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('getJwt', () => {
        it('should return a JWT token with the provided payload', async () => {
            // Mock the necessary dependencies
            const mockPayload = { userId: '123' };
            const mockToken = 'mockToken';

            // Mock the signAsync method to return the mockToken
            jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockToken as never);

            // Call the getJwt method
            const result = await authService.getJwt(mockPayload);

            // Assert that a JWT token is returned
            expect(result).toEqual(mockToken);
            expect(jwtService.signAsync).toHaveBeenCalledWith(mockPayload);
        });
    });

    describe('changePassword', () => {
        it('should change the password of the user with the provided userId', async () => {
            // Mock the necessary dependencies
            const mockUserId = '123';
            const mockOldPassword = 'oldPassword';
            const mockNewPassword = 'newPassword';
            const mockUser: User = {
                username: 'mockUsername',
                email: '',
                password: await bcrypt.hash(mockOldPassword, 10),
                is_google_oauth: false,
                access_token: '',
                refresh_token: '',
            }



        });

        it('should throw an UnauthorizedException if the old password is incorrect', async () => {
            // TODO: Implement this test
        });
    });

    describe('changeUsernameOrEmail', () => {
        it('should change the username or email of the user with the provided userId', async () => {
            // TODO: Implement this test
        });
    });

});