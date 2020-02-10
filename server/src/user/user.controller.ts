import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInputDto } from './userInput.dto';
import { User } from './user.interface';
import { UserLoggedInDto } from './userLoggedIn.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Body() userLoggedInDto: UserLoggedInDto): Promise<User> {
    return await this.userService.getUser(userLoggedInDto);
  }

  @Post()
  async updateUser(@Body() userInputDto: UserInputDto): Promise<User> {
    return await this.userService.updateUser(userInputDto);
  }
}
