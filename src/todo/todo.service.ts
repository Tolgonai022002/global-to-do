import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateDto, UpdateDto } from './dto/dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  async create(todo: CreateDto) {
    todo.isCompleted = false
    return await this.todoRepository.save(todo)
  }

  async find(id: number) {
    const findTodoById = await this.todoRepository.findOne({ where: { id } })
    if(!findTodoById) {
      throw new NotFoundException(`Todo with id ${id} is not exists`)
    }
    return findTodoById
  }

  async findAll(params: Partial<Todo>) {
    const finsAllTodos = await this.  todoRepository.find({ where: params }) 
    return finsAllTodos 
  }

  async update(id: string, updatedTodo: UpdateDto) {
    const updateTodo = await this.todoRepository.findOne({ where: { id: +id } })
    if(!updateTodo) {
      throw new NotFoundException(`Todo with id ${id} is not exists`)
    }
    const todo = Object.assign(updateTodo, updatedTodo)
    await this.todoRepository.save(todo)
    return todo
  }

  async delete(id: string): Promise<void> {
    const deleteOneTodo = await this.todoRepository.findOne({ where: { id: +id } })
    if(!deleteOneTodo) {
      throw new NotFoundException(`Todo with id ${id} is not exists`)
    }
    await this.todoRepository.remove(deleteOneTodo)
  }
}