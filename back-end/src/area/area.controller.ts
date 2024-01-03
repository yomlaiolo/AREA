import { Controller, Get, Post, Body, Delete, Param, Req, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { AreaService } from './area.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@ApiTags('area')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  @Post('create')
  @ApiBody({ type: CreateAreaDto })
  @ApiBearerAuth('access-token')
  create(@Body() createAreaDto: CreateAreaDto, @Req() request: Request) {
    const user = request['user'];
    const user_id = user['user']['_id'];
    return this.areaService.create(createAreaDto, user_id);
  }

  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  async delete(@Param('id') id: string, @Req() request: Request) {
    const user = request['user'];
    const user_id = user['user']['_id'];
    const area = await this.areaService.findOne(id);
    if (!area) throw new NotFoundException('Area not found');
    if (area.user_id != user_id) throw new BadRequestException('You are not the owner of this area');
    return this.areaService.delete(id);
  }

  @Get()
  @ApiBearerAuth('access-token')
  async findAllForUser(@Req() request: Request) {
    const all_areas = await this.areaService.findAll();
    const user = request['user'];
    const user_id = user['user']['_id'];
    const filtered_areas = all_areas.filter(area => area.user_id == user_id);
    filtered_areas.forEach(area => {
      delete area.user_id;
      delete area.action.value;
      delete area.reaction.value;
    });
    return filtered_areas;
  }
}
