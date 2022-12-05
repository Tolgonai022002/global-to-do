import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Todo')
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  title: string;

  @ApiProperty()
  @Column({default: false})
  isCompleted?: boolean;
}

