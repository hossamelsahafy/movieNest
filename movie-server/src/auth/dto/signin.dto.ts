import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Password: string;
}
