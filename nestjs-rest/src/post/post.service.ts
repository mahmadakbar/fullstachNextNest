import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly dbService: PrismaService) {}

  /**
   * get all post by user
   * @returns
   */
  async findAll(uuid: string) {
    return await this.dbService.user.findFirst({
      where: { uuid },
      include: {
        posts: true,
      },
    });
  }

  /**
   * get post by id
   * @param uuid
   */
  async findOne(uuid: string) {
    return await this.dbService.post.findUnique({
      where: { uuid },
    });
  }

  /**
   * create post
   * @param authorId
   * @param data
   */
  async createData(authorId: string, data: CreatePostDto) {
    return await this.dbService.post.create({
      data: {
        ...data,
        authorId,
        createdAt: new Date(),
      },
    });
  }

  /**
   * Update post
   * @param uuid
   * @param body
   */

  async update(uuid: string, data: CreatePostDto) {
    return await this.dbService.post.update({
      data: { ...data, updatedAt: new Date() },
      where: { uuid },
    });
  }

  /**
   * Delete post
   * @param uuid
   */
  async delete(uuid: string) {
    return await this.dbService.post.delete({
      where: { uuid },
    });
  }
}
