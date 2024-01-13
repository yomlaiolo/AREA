import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GMailService } from './gmail.service';

@Module({
    imports: [
        ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
        }),
    ],
    providers: [GMailService],
    exports: [GMailService],
})

export class GMailModule {}
