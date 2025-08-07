import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name must not be empty' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name must not be empty' })
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either admin or user' })
  role: UserRole;

  @IsOptional()
  @IsBoolean({ message: 'isApproved must be a boolean' })
  isApproved: boolean;

  // Optional: Define other properties if needed (like role or isApproved)
}
