import { Controller, Post, Body } from '@nestjs/common';
import { CronJob } from 'cron';
import { CronDto } from './cron-action.dto';
import { Public } from 'src/auth/auth.decorator';
import { SchedulerRegistry } from '@nestjs/schedule';

@Controller('cron-action')
export class CronActionController {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Public()
  @Post('create')
  createCronJob(@Body() cronDto: CronDto) {
    const job = new CronJob(cronDto.frequency, () => {
      console.log(`Cron job "${cronDto.name}" executed at ${new Date()}`);
    });

    this.schedulerRegistry.addCronJob(cronDto.name, job);
    job.start();
  }
}
