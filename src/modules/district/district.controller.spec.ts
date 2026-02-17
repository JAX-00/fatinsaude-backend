import { Test, TestingModule } from '@nestjs/testing';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('DistrictController', () => {
  let controller: DistrictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictController],
      providers: [
        DistrictService,
        {
          provide: PrismaService,
          useValue: {
            district: {
              findMany: jest.fn(),
              create: jest.fn(), // <--- Pakai yang ini supaya lebih lengkap
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
