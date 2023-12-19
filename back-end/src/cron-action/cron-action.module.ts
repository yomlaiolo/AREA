import { Module } from '@nestjs/common';
import { CronActionController } from './cron-action.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CronActionController],
  providers: [],
})
export class CronActionModule {}
