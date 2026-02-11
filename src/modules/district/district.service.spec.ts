import { Test, TestingModule } from '@nestjs/testing';
import { DistrictService } from './district.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';

describe('DistrictService', () => {
  let service: DistrictService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistrictService,
        {
          provide: PrismaService,
          useValue: {
            district: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DistrictService>(DistrictService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a district', async () => {
      const dto: CreateDistrictDto = { name: 'Dili' };
      (prisma.district.create as jest.Mock).mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
      expect(prisma.district.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return all districts', async () => {
      const districts = [{ name: 'Dili' }];
      (prisma.district.findMany as jest.Mock).mockResolvedValue(districts);

      const result = await service.findAll();
      expect(result).toEqual(districts);
    });
  });

  describe('findOne', () => {
    it('should return a district if found', async () => {
      const district = { id: 1, name: 'Dili' };
      (prisma.district.findUnique as jest.Mock).mockResolvedValue(district);

      const result = await service.findOne(1);
      expect(result).toEqual(district);
    });

    it('should throw NotFoundException if district not found', async () => {
      (prisma.district.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
