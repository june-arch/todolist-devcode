import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum priorities {
  VERY_HIGH = 'very-high',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  VERY_LOW = 'very-low',
}

export class CreateTodoListDto {
  @IsNumber()
  @IsNotEmpty()
  activity_group_id: number;

  @IsEnum(priorities)
  @IsNotEmpty()
  priority: priorities;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  is_active: string;
}
