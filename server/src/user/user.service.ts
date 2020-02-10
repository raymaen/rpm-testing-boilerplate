import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { UserLoggedInDto } from './userLoggedIn.dto';
import { UserInputDto } from './userInput.dto';
import { throws } from 'assert';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUser(userLoggedInDto: UserLoggedInDto): Promise<User> {
    const user = await this.getUserByEmail(userLoggedInDto.email);

    if (user) {
      return user;
    }

    Logger.log('Adding new user to system');
    return await this.addNewUser(userLoggedInDto);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.find({ email }).query.exec.exec();
  }

  async addNewUser(userLoggedInDto: UserLoggedInDto): Promise<User> {
    const newUser = new this.userModel({
      email: userLoggedInDto.email,
      name: userLoggedInDto.email,
      data: '',
      lastUpdated: Date.now(),
    });
    return await newUser.save();
  }

  async updateUser(userInputDto: UserInputDto): Promise<User> {
    const user = await this.getUserByEmail(userInputDto.email);

    if (!user) {
      throw new Error('No user found');
    }

    if (user.lastUpdated < userInputDto.lastUpdated) {
      user.data = userInputDto.data;
      user.lastUpdated = userInputDto.lastUpdated;
    }

    return await this.userModel.findByIdAndUpdate(user.id, user).exec();
  }
}
