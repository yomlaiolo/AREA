import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area } from './area.schema';
import { ActionDto, CreateAreaDto, ReactionDto } from './dto/create-area.dto';
import { CancellationToken } from './cancellation';

// Actions
import { intervalAction } from './actions/interval';

// Reactions
import { printReaction } from './reactions/print';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>) { }
  private cancellation_tokens: Map<string, CancellationToken> = new Map();

  factoryAction(actionDto: ActionDto): Function {
    if (actionDto.type == 'interval') return intervalAction;
    return null;
  }

  factoryReaction(reactionDto: ReactionDto): Function {
    if (reactionDto.type == 'print') return printReaction;
    return null;
  }

  launchArea(actionDto: ActionDto, reactionDto: ReactionDto, id: string): void {
    const action = this.factoryAction(actionDto);
    const reaction = this.factoryReaction(reactionDto);

    if (!action || !reaction) throw new BadRequestException('Invalid action or reaction');
    const token = new CancellationToken();
    this.cancellation_tokens.set(id, token);
    action(actionDto.value, reaction, reactionDto.value, token);
  }

  launchAllAreas(): void {
    this.areaModel.find().exec().then(areas => {
      areas.forEach(area => {
        this.launchArea(area.action, area.reaction, area._id.toString());
      });
    });
  }

  async create(createAreaDto: CreateAreaDto, user_id: string): Promise<Object> {
    const area = new this.areaModel({...createAreaDto, user_id: user_id});
    this.launchArea(area.action, area.reaction, area._id.toString());
    return {id: (await area.save())._id.toString()}
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
