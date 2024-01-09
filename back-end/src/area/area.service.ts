import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area } from './area.schema';
import { ActionDto, CreateAreaDto, ReactionDto } from './dto/create-area.dto';
import { CancellationToken } from '../utils/cancellation_token';

import { factoryAction, factoryReaction } from './services/services';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AreaService {
  constructor(
    @InjectModel(Area.name) private areaModel: Model<Area>,
    private readonly usersService: UsersService,
  ) {}
  private cancellation_tokens: Map<string, CancellationToken> = new Map();

  async launchArea(
    actionDto: ActionDto,
    reactionDto: ReactionDto,
    id: string,
  ): Promise<void> {
    const action = factoryAction(actionDto);
    const reaction = factoryReaction(reactionDto);

    if (!action || !reaction)
      throw new BadRequestException('Invalid action or reaction');
    const token = new CancellationToken();
    this.cancellation_tokens.set(id, token);
    const area = await this.areaModel.findById(id).exec();
    const user = this.usersService.findOneById(area.user_id);
    action(actionDto.value, reaction, reactionDto.value, token, user);
  }

  launchAllAreas(): void {
    this.areaModel
      .find()
      .exec()
      .then((areas) => {
        areas.forEach((area) => {
          try {
            this.launchArea(area.action, area.reaction, area._id.toString());
          } catch (e) {
            console.error('Error in launchArea:', e);
          }
        });
      });
  }

  async create(createAreaDto: CreateAreaDto, user_id: string): Promise<Object> {
    const area = new this.areaModel({ ...createAreaDto, user_id: user_id });
    this.launchArea(area.action, area.reaction, area._id.toString());
    return { id: (await area.save())._id.toString() };
  }

  async delete(id: string): Promise<void> {
    const token = this.cancellation_tokens.get(id);
    token.cancel();
    this.areaModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<Area[]> {
    return this.areaModel.find().exec();
  }

  async findOne(id: string): Promise<Area> {
    return this.areaModel.findById(id).exec();
  }

  async onModuleInit(): Promise<void> {
    this.launchAllAreas();
  }
}
