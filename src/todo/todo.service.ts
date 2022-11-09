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
    const unique = await this.todoRepository.findOne({ where: { id } })
    if(!unique) {
      throw new NotFoundException(`Todo with id ${id} is not exists`)
    }
    return unique
  }

  async findAll(params: Partial<Todo>) {
    const todos = await this.  todoRepository.find({ where: params }) 
    return todos 
  }

  async update(id: string, updatedTodo: UpdateDto) {
    const unique = await this.todoRepository.findOne({ where: { id: +id } })
    if(!unique) {
      throw new NotFoundException(`Todo with id ${id} is not exists`)
    }
    const todo = Object.assign(unique, updatedTodo)
    await this.todoRepository.save(todo)
    return todo
  }

  async delete(id: string): Promise<void> {
    const unique = await this.todoRepository.findOne({ where: { id: +id } })
    if(!unique) {
      throw new NotFoundException(`Todo with id ${id} is not exists`)
    }
    await this.todoRepository.remove(unique)
  }
}