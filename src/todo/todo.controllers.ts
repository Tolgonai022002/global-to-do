import { Controller, Get, Post, Put, Delete, Param, Body, } from "@nestjs/common";
import { Todo } from "./entities/todo.entity";
import { TodoService } from "./todo.service";


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll(todoParams?: Todo) {
    const todos = await this.todoService.findAll(todoParams)
    return todos
  }
  
  @Get(':id')
  async getById(@Param('id') id: number) {
    const unique = await this.todoService.find(id)
    return unique
  }

  @Post()
  async createOne(@Body() todo: Todo) {
    const newTodo = await this.todoService.create(todo) 
    return newTodo
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string, 
    @Body() updatedTodo: Todo) {
    const todo = await this.todoService.update(id, updatedTodo)
    console.log(todo)
    return todo
  }

  @Delete(':id') 
  async deleteOne(@Param('id') id: string) {
    await this.todoService.delete(id)
  }
}



