import { Controller, Get, Post, Put, Delete, Param, Body, } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { CreateDto } from "./dto/dto";
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
  // @Post()
  // @ApiBody({type:[CreateDto]})
  // createAction(@Body() CreateDto: CreateDto):Promise<Todo>{
  //   const todo = new Todo();
  //   todo.title = createDto.title;
  //   if(CreateDto.isCompleted!==undefined){
  //     todo.isCompleted = createDto.isCompleted;
  //   }
  //   return this.todoService.create(todo)
  // }


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



