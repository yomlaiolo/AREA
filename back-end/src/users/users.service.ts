import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    let returnedUser: User;

    if (
      createUserDto.username  == undefined ||
      createUserDto.firstname == undefined ||
      createUserDto.lastname  == undefined ||
      createUserDto.email     == undefined ||
      createUserDto.password  == undefined
    ) {
      throw new BadRequestException("Missing fields required for user creation");
    }
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