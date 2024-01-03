import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area } from './area.schema';

import { intervalAction } from './actions/delay';
import { printReaction } from './reactions/print';
import { ActionDto, ReactionDto } from './dto/create-area.dto';
import { CancellationToken } from './cancellation';
import { ObjectId } from 'mongodb';

@Injectable()
export class AreaService {
  constructor(@InjectModel('Area') private readonly areaModel: Model<Area>) { }
  private cancellation_tokens: Map<string, CancellationToken> = new Map();

  factoryAction(actionDto: ActionDto) {
    if (actionDto.type === 'delay') return intervalAction;
  }

  factoryReaction(reactionDto: ReactionDto) {
    if (reactionDto.type === 'print') return printReaction;
  }

  launchArea(actionDto: ActionDto, reactionDto: ReactionDto, id: string): void {
    const action = this.factoryAction(actionDto);
    const reaction = this.factoryReaction(reactionDto);
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

  async create(createAreaDto: any): Promise<Area> {
    const area = new this.areaModel(createAreaDto);
    this.launchArea(area.action, area.reaction, area._id.toString());
    return area.save();
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
}
