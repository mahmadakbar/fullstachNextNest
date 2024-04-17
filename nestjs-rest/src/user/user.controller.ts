import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   /**
  //    * Get users
  //    * @returns
  //    */
  //   @Get()
  //   async users() {
  //     return await this.userService.findAll();
  //   }

  /**
   * Register user
   * @param body
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Post('/register')
  async createUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.userService.createData(body);
      //return with custom message
      return {
        status: 200,
        message: 'User created successfully',
        data: {
          uuid: user.uuid,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta.target[0] === 'email') {
          throw new HttpException(
            {
              status: 402,
              error: 'Email already exists',
              data: [],
            },
            402,
          );
        }
      }
      throw error;
    }
  }

  /**
   * Login user
   * @param uuid
   * @returns
   */

  @Post('/login')
  async loginUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.userService.login(body.email, body.password);
      if (!user) throw new Error('Email or password is incorrect');
      return {
        status: 200,
        message: 'Login successful',
        data: {
          uuid: user.uuid,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      if (error.message === 'Email or password is incorrect') {
        throw new HttpException(
          {
            status: 402,
            error: 'Email or password is incorrect',
            data: [],
          },
          402,
        );
      }
      throw error;
    }
  }

  /**
   * Update user
   * @param body
   * @returns
   * */
  @UsePipes(ValidationPipe)
  @Post('/update/:uuid')
  async updateUser(@Param('uuid') uuid, @Body() body: CreateUserDto) {
    try {
      const user = await this.userService.update(uuid, body);
      return {
        status: 200,
        message: 'User updated successfully',
        data: {
          uuid: user.uuid,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          {
            status: 403,
            error: `User with email ${body.email} not found`,
            data: [],
          },
          403,
        );
      }
      throw error;
    }
  }

  /**
   * Delete user
   * @param uuid
   * @returns
   */
  @Delete('/remove/:uuid')
  async deleteUser(@Param('uuid') uuid, @Body() body: CreateUserDto) {
    try {
      const user = await this.userService.delete(uuid);
      return {
        status: 200,
        message: 'User deleted successfully',
        data: {
          uuid: user.uuid,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          {
            status: 404,
            error: `User with email ${body.email} not found`,
            data: [],
          },
          404,
        );
      }
      throw error;
    }
  }
}
