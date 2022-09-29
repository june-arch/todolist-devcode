import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
