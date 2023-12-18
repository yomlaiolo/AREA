import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    let returnedUser: User;
    const regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");

    if (
      createUserDto.username  == undefined ||
      createUserDto.firstname == undefined ||
      createUserDto.lastname  == undefined ||
      createUserDto.email     == undefined ||
      createUserDto.password  == undefined
    ) {
      throw new BadRequestException("Missing fields required for user creation");
    }

    if (!regexPassword.test(createUserDto.password)) {
      throw new NotAcceptableException("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number");
    }
    if (!regexEmail.test(createUserDto.email)) {
      throw new NotAcceptableException("Email is not valid");
    }

    // Check if user already exists
    const user = await this.userModel.findOne({username: createUserDto.username}).exec();
    if (user)
      throw new ConflictException("User already exists");
    const email = await this.userModel.findOne({email: createUserDto.email}).exec();
    if (email)
      throw new ConflictException("Email already exists");

    // encrypt password with bcrypt
    const salt = await bcrypt.genSalt();
    createdUser.password = await bcrypt.hash(createUserDto.password, salt);

    try {
      returnedUser = await createdUser.save();
    } catch (error) {
      throw new ConflictException("User already exists");
    }
    return returnedUser;
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({username: username}).exec();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email: email}).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async deleteAll(): Promise<any> {
    return this.userModel.deleteMany({});
  }
}