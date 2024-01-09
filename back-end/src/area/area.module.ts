import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './area.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports : [MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]), UsersModule],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService]
})
export class AreaModule {}
