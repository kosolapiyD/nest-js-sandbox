import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // GET /users
  // GET /users/:id
  // POST /users
  // PUT /users/:id
  // DELETE /users/:id

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body() user: { name: string; email: string }) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: { name: string; email: string },
  ) {
    const updatedUser = {
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
