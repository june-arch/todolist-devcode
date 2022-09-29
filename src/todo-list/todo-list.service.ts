import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/helpers/prisma/prisma.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';

@Injectable()
export class TodoListService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTodoListDto: CreateTodoListDto) {
    const { activity_group_id, ...createDoc } = createTodoListDto;
    try {
      const result = await this.prisma.todolist.create({
        data: {
          ...createDoc,
          activity_group_id,
          created_at: new Date(),
        },
      });
      delete result.is_deleted;
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.todolist.findMany({
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
      const result = await this.prisma.todolist.findFirst({
        select: {
          id: true,
          title: true,
          activity_group_id: true,
          is_active: true,
          priority: true,
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

  async update(id: number, updateTodoListDto: UpdateTodoListDto) {
    if (updateTodoListDto.activity_group_id) {
      throw new ConflictException('activity_group_id cant change');
    }
    try {
      const result = await this.prisma.todolist.findFirst({
        where: {
          id: id,
          is_deleted: '0',
        },
      });
      if (!result) {
        throw new NotFoundException(`data with id: ${id} not found`);
      }
      const update = await this.prisma.todolist.update({
        where: {
          id: id,
        },
        data: {
          ...updateTodoListDto,
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
      const result = await this.prisma.todolist.findFirst({
        where: {
          id: id,
          is_deleted: '0',
        },
      });
      if (!result) {
        throw new NotFoundException(`data with id: ${id} not found`);
      }
      const remove = await this.prisma.todolist.delete({
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
