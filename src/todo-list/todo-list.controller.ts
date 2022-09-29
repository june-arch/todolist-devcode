import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { UsePipes } from '@nestjs/common/decorators';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoListService.create(createTodoListDto);
  }

  @Get()
  findAll() {
    return this.todoListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoListService.update(+id, updateTodoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
