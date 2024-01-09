import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GDriveService } from './gdrive.service';

@Module({
    imports: [
        ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
        }),
    ],
    providers: [GDriveService],
    exports: [GDriveService],
})

export class GDriveModule {}
