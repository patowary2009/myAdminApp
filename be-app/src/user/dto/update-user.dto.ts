import {
  IsOptional,
  IsEmail,
  MinLength,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'Invalid email address' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either admin or user' })
  role?: UserRole;

  @IsOptional()
  @IsBoolean({ message: 'isApproved must be a boolean' })
  isApproved?: boolean;

  // Optional: Add further properties based on your requirements
}
