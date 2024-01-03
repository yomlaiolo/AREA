import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { AreaService } from './area.service';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

}
