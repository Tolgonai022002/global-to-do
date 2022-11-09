import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './utils/db_config';
import { TodoModule } from './todo/todo.modules';



@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}







