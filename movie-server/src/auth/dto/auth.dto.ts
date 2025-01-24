import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Password: string;

  @IsNotEmpty()
  @IsString()
  FirstName: string;

  @IsNotEmpty()
  @IsString()
  LastName: string;
}
