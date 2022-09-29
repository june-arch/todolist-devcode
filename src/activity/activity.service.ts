import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/helpers/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      const result = await this.prisma.activity_group.create({
        data: { ...createActivityDto, created_at: new Date() },
      });
      delete result.is_deleted;
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.activity_group.findMany({
        select: {
          id: true,
          title: true,
          created_at: true,
        },
        where: {
          is_deleted: '0',
        },
      });
      if (result.length == 0) {
        throw new NotFoundException('data not found');
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.activity_group.findFirst({
        select: {
          id: true,
          title: true,
          created_at: true,
          todolist: {
            select: {
              id: true,
              title: true,
              activity_group_id: true,
              is_active: true,
              priority: true,
            },
            where: {
              is_deleted: '0',
            },
          },
        },
        where: {
          id: id,
          is_deleted: '0',
        },
      });
      if (!result) {
        throw new NotFoundException(`data with id: ${id} not found`);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    try {
      const result = await this.prisma.activity_group.findFirst({
        select: {
          id: true,
          title: true,
          created_at: true,
        },
        where: {
          id: id,
          is_deleted: '0',
        },
      });
      if (!result) {
        throw new NotFoundException(`data with id: ${id} not found`);
      }
      const update = await this.prisma.activity_group.update({
        where: {
          id: id,
        },
        data: {
          title: updateActivityDto.title,
          updated_at: new Date(),
        },
      });
      delete update.is_deleted;
      return update;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.activity_group.findFirst({
        select: {
          id: true,
          title: true,
          created_at: true,
        },
        where: {
          id: id,
          is_deleted: '0',
        },
      });
      if (!result) {
        throw new NotFoundException(`data with id: ${id} not found`);
      }
      const remove = await this.prisma.activity_group.delete({
        where: {
          id: id,
        },
      });
      delete remove.is_deleted;
      return remove;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
