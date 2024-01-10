import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Req,
  BadRequestException,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { AreaService } from './area.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@ApiTags('area')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @ApiBody({ type: CreateAreaDto })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, description: 'Created - Area created' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data' })
  async create(@Body() createAreaDto: CreateAreaDto, @Req() request: Request) {
    const user = request['user'];
    const user_id = user['user']['_id'];
    const area = await this.areaService.create(createAreaDto, user_id);
    if (area['error']) throw new BadRequestException(area['error']);
    else return area;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'OK - Area deleted' })
  @ApiResponse({ status: 404, description: 'Not Found - Area not found' })
  async delete(@Param('id') id: string, @Req() request: Request) {
    const user = request['user'];
    const user_id = user['user']['_id'];
    const area = await this.areaService.findOne(id);
    if (!area) throw new NotFoundException('Area not found');
    if (area.user_id != user_id)
      throw new BadRequestException('You are not the owner of this area');
    return this.areaService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'OK - Get all areas' })
  async findAllForUser(@Req() request: Request) {
    const all_areas = await this.areaService.findAll();
    const user = request['user'];
    const user_id = user['user']['_id'];
    const filtered_areas = all_areas.filter((area) => area.user_id == user_id);
    filtered_areas.forEach((area) => {
      delete area.user_id;
      delete area.action.value;
      delete area.reaction.value;
    });
    return filtered_areas;
  }
}
