import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @Length(5, 50)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @Length(5, 50)
  @IsNotEmpty()
  password: string;
}
