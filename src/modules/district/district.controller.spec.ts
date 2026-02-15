import { Test, TestingModule } from '@nestjs/testing';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service'; // <--- Tambah import ini
import { PrismaService } from '../../prisma/prisma.service'; // <--- Tambah import ini

describe('DistrictController', () => {
  let controller: DistrictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictController],
      providers: [
        DistrictService, // <--- Kenalkan Service ke Controller
        {
          provide: PrismaService, // <--- Kenalkan Prisma juga karena Service butuh Prisma
          useValue: {
            district: {
              findMany: jest.fn(),
              create: jest.fn(),
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
