import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DistrictModule } from './modules/district/district.module';
import {ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    DistrictModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
