import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // GET /users
  // GET /users/:id
  // POST /users
  // PUT /users/:id
  // DELETE /users/:id

  @Get()
  getUsers(@Query('role') role?: 'admin' | 'user' | 'guest'): User[] {
    return this.usersService.getUsers(role);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): User | undefined {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body() user: Omit<User, 'id'>): User {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: Omit<User, 'id'>) {
    const updatedUser: User = {
      id: Number(id),
      ...user,
    };
    this.usersService.updateUser(updatedUser);
    return updatedUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.usersService.deleteUser(Number(id));
    return { message: 'User deleted successfully' };
  }
}
