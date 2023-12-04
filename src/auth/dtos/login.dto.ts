import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class LoginDto extends PartialType(User) {
  @IsString()
  @Transform(({ value }) => value?.trim())
  username: string;

  @IsString()
  password: string;
}
