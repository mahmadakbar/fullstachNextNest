import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbService: PrismaService) {}

  /**
   * get user
   * @returns
   */
  async findUser(uuid: string) {
    return await this.dbService.user.findUnique({
      where: { uuid },
    });
  }

  /**
   * create user
   * @param data
   */
  async createData(data: CreateUserDto) {
    return await this.dbService.user.create({ data });
  }

  /**
   * login user
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    return await this.dbService.user.findUnique({ where: { email, password } });
  }

  /**
   * update user
   * @param uuid
   * @param data
   */
  async update(uuid: string, data: CreateUserDto) {
    return await this.dbService.user.update({
      data,
      where: { uuid },
    });
  }

  /**
   * delete user
   * @param uuid
   */
  async delete(uuid: string) {
    return await this.dbService.user.delete({ where: { uuid } });
  }
}
