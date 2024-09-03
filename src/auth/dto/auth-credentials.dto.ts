import {
  IsNotEmpty,
  IsString,
  IsEnum,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'src/types';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRoles)
  role: UserRoles;
}
