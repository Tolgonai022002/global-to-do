import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { CreateDto, UpdateDto } from "./dto/dto";
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
  async getById(
    @Param('id') id: number) {
    const getOneTodoById = await this.todoService.findOne(id)
    if(!getOneTodoById){
      throw new NotFoundException(`Todo with id ${id} was not found!`)
    }
    return getOneTodoById
  }

  @Post()
  async createOne(
    @Body() todo: Todo) {
    const newTodo = await this.todoService.create(todo) 
    return newTodo
  }


  @Put(':id')
  async updateOneTodo(
    @Param('id') id: string, 
    @Body() updatedTodo: Todo) {
    const todo = await this.todoService.update(id, updatedTodo)
    if(!todo){
      throw new NotFoundException(`Todo with id ${id} was not found!`)
    }
    return todo
  }


  @Delete(':id') 
  async deleteOne(@Param('id') id: string) {
    await this.todoService.delete(id)
  }
}



