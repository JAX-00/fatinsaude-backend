import { Test, TestingModule } from '@nestjs/testing';
import { DistrictController } from './district.controller';
<<<<<<< HEAD
import { DistrictService } from './district.service'; // <--- Tambah import ini
import { PrismaService } from '../../prisma/prisma.service'; // <--- Tambah import ini
=======
import { DistrictService } from './district.service';
import { PrismaService } from '../../prisma/prisma.service';
>>>>>>> develop

describe('DistrictController', () => {
  let controller: DistrictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictController],
      providers: [
<<<<<<< HEAD
        DistrictService, // <--- Kenalkan Service ke Controller
        {
          provide: PrismaService, // <--- Kenalkan Prisma juga karena Service butuh Prisma
          useValue: {
            district: {
              findMany: jest.fn(),
              create: jest.fn(),
=======
        DistrictService,
        {
          provide: PrismaService,
          useValue: {
            district: {
              findMany: jest.fn(),
              create: jest.fn(), // <--- Pakai yang ini supaya lebih lengkap
>>>>>>> develop
            },
          },
        },
      ],
    }).compile();

    controller = module.get<DistrictController>(DistrictController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
