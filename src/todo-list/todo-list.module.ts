import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { PrismaModule } from 'src/helpers/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
