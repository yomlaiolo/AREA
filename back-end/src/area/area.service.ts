import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area } from './area.schema';
import { ActionDto, CreateAreaDto, ReactionDto } from './dto/create-area.dto';
import { CancellationToken } from '../utils/cancellation_token';

import { factoryArea } from './services/services';
import { UsersService } from '../users/users.service';
import { GithubService } from 'src/github-action/github.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';
import { GMailService } from 'src/gmail/gmail.service';
import { NasaService } from 'src/nasa/nasa.service';

@Injectable()
export class AreaService {
  constructor(
    @InjectModel(Area.name) private areaModel: Model<Area>,
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly gDriveService: GDriveService,
    private readonly openAiService: OpenAIService,
    private readonly gmailService: GMailService,
    private readonly nasaService: NasaService,
  ) {}
  private cancellation_tokens: Map<string, CancellationToken> = new Map();

  async launchArea(
    actionDto: ActionDto,
    reactionDto: ReactionDto,
    id: string,
    area: Area,
    first_launch: boolean,
  ): Promise<object> {
    const token = new CancellationToken();
    this.cancellation_tokens.set(id, token);
    const user = await this.usersService.findOneById(area.user_id);

    const action = factoryArea(
      actionDto,
      reactionDto,
      user,
      token,
      id,
      area.first_launch,
      this.githubService,
      this.usersService,
      this.gDriveService,
      this.openAiService,
      this,
      this.gmailService,
      this.nasaService,
    );

    if (!action || !(await action.check()))
      return { error: 'Action or reaction not found' };
    else action.exec();
    return { id: id };
  }

  launchAllAreas(): void {
    this.areaModel
      .find()
      .exec()
      .then((areas) => {
        areas.forEach((area) => {
          try {
            this.launchArea(
              area.action,
              area.reaction,
              area._id.toString(),
              area,
              false,
            );
          } catch (e) {
            console.error('Error in launchArea:', e);
          }
        });
      });
  }

  async create(createAreaDto: CreateAreaDto, user_id: string): Promise<Object> {
    const area = new this.areaModel({
      ...createAreaDto,
      user_id: user_id,
      results: null,
      first_launch: true,
    });
    const response = await this.launchArea(
      area.action,
      area.reaction,
      area._id.toString(),
      area,
      true,
    );
    if (response['error']) {
      throw new BadRequestException(response['error']);
    }
    area.first_launch = false;
    await area.save();
    return response;
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

  async deleteResults(id: string): Promise<void> {
    const area = await this.areaModel.findById(id).exec();
    area.results = null;
    area.save();
  }

  async updateResult(id: string, result: object): Promise<void> {
    const area = await this.areaModel.findById(id).exec();
    area.results = result;
    area.save();
  }

  async onModuleInit(): Promise<void> {
    this.launchAllAreas();
  }
}
