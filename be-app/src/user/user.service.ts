import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data); // Create a new User instance
    return this.userRepository.save(user); // Save it to the database
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // Retrieve all users
  }
}
