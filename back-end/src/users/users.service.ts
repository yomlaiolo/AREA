import { Model } from 'mongoose';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { AccessTokenDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    let returnedUser: User;
    const regexPassword = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
    );
    const regexEmail = new RegExp(
      '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
    );

    if (
      createUserDto.username == undefined ||
      createUserDto.email == undefined ||
      (createUserDto.password == undefined &&
        createUserDto.is_google_oauth == false)
    ) {
      throw new BadRequestException(
        'Missing fields required for user creation',
      );
    }

    if (
      !regexPassword.test(createUserDto.password) &&
      createUserDto.password != undefined
    ) {
      throw new NotAcceptableException(
        'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number',
      );
    }
    if (!regexEmail.test(createUserDto.email)) {
      throw new NotAcceptableException('Email is not valid');
    }

    // Check if user already exists
    const user = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
    if (user) throw new ConflictException('User already exists');
    const email = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (email) throw new ConflictException('Email already exists');

    if (createUserDto.is_google_oauth) {
      createdUser.password = null;
      createdUser.google = {
        username: createUserDto.username,
        access_token: createUserDto.google.access_token,
        refresh_token: createUserDto.google.refresh_token,
        id_token: createUserDto.google.id_token,
      };
    } else {
      createdUser.google = null;
    }

    // encrypt password with bcrypt
    createdUser.password = null;
    createdUser.github = null;
    if (createUserDto.password) {
      const salt = await bcrypt.genSalt();
      createdUser.password = await bcrypt.hash(createUserDto.password, salt);
    }

    try {
      returnedUser = await createdUser.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
    return returnedUser;
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findOneByGithubUsername(username: string): Promise<User> {
    return this.userModel.findOne({ 'github.username': username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async deleteAll(): Promise<any> {
    return this.userModel.deleteMany({});
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    user.password = newPassword;
    await user.save();
  }

  async updateUsername(userId: string, newUsername: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    user.username = newUsername;
    await user.save();
  }

  async updateEmail(userId: string, newEmail: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    user.email = newEmail;
    await user.save();
  }

  async setGithubUser(username: string, token: string, id: string) {
    this.userModel
      .findByIdAndUpdate(id, {
        github: { username: username, access_token: token, webhooks: {} },
      })
      .exec();
  }

  async addWebhookUUID(
    repoOwner: string,
    repoName: string,
    webhookUUID: string,
  ) {
    this.userModel
      .findOneAndUpdate(
        { 'github.username': repoOwner },
        {
          $set: {
            [`github.webhooks.${repoOwner}/${repoName}.webhookUUID`]:
              webhookUUID,
          },
        },
      )
      .exec();
  }

  async addWebhookId(repoOwner: string, repoName: string, webhookId: string) {
    this.userModel
      .findOneAndUpdate(
        { 'github.username': repoOwner },
        {
          $set: {
            [`github.webhooks.${repoOwner}/${repoName}.webhookUUID`]: webhookId,
          },
        },
      )
      .exec();
  }

  async addWebhookReaction(
    repoOwner: string,
    repoName: string,
    reactionFunc: string,
    actionData: object,
    reactionData: object,
  ) {
    this.userModel
      .findOneAndUpdate(
        { 'github.username': repoOwner },
        {
          $set: {
            [`github.webhooks.${repoOwner}/${repoName}.reactionFunc`]:
              reactionFunc,
            [`github.webhooks.${repoOwner}/${repoName}.actionData`]: actionData,
            [`github.webhooks.${repoOwner}/${repoName}.reactionData`]:
              reactionData,
          },
        },
      )
      .exec();
  }

  async setWebhookReactionData(
    repoOwner: string,
    repoName: string,
    data: object,
  ) {
    this.userModel
      .findOneAndUpdate(
        { 'github.username': repoOwner },
        {
          $set: {
            [`github.webhooks.${repoOwner}/${repoName}.data`]: data,
          },
        },
      )
      .exec();
  }

  async removeWebhook(repoOwner: string, repoName: string) {
    this.userModel
      .findOneAndUpdate(
        { 'github.username': repoOwner },
        { $unset: { [`github.webhooks.${repoOwner}/${repoName}`]: '' } },
      )
      .exec();
  }

  async updateAcessToken(userId: string, accessToken: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();

    user.google.access_token = accessToken;

    user.save();
  }
}
