import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    isCompleted?: boolean;
  }
  
  export class UpdateDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    isCompleted?: boolean;
  }
