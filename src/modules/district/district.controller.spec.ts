import { Test, TestingModule } from '@nestjs/testing';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('DistrictController', () => {
  let controller: DistrictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictController],
      // Di sini kuncinya! Controller butuh Service dan Prisma
      providers: [
        DistrictService,
        {
          provide: PrismaService,
          useValue: { district: { findMany: jest.fn() } }
        }
      ],
    }).compile();

    controller = module.get<DistrictController>(DistrictController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
