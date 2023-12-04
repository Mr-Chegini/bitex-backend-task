import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsString, Matches, MaxLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class RegisterUserDto extends PartialType(User) {
  @IsString()
  @Transform(({ value }) => value?.trim())
  username: string;

  @IsString()
  @MaxLength(16)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    {
      message:
        'Password is too weak. It must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*#?&), and be at least 8 characters long.',
    },
  )
  password: string;
}
