import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DistrictModule } from './modules/district/district.module';
import {ConfigModule } from '@nestjs/config';
import { HospitalModule } from './modules/hospital/hospital.module';

@Module({
  imports: [
    PrismaModule,
    DistrictModule,
    HospitalModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
