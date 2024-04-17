import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:uuid')
  async getAllData(@Param('uuid') uuid) {
    try {
      const data = await this.postService.findAll(uuid);
      if (data.posts.length === 0) throw new Error('Post not found');
      return {
        status: 200,
        message: 'Post fetched successfully',
        data: {
          author: data.name,
          totalData: data.posts.length,
          posts: data.posts.map((post) => ({
            uuid: post.uuid,
            title: post.title,
            content: post.content,
            publish: post.published,
            image: post.image,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          })),
        },
      };
    } catch (error) {
      // error with status 404
      throw new HttpException(
        {
          status: 404,
          error: 'Post not found',
          data: [],
        },
        404,
      );
    }
  }

  /**
   * @param id
   * @returns
   */
  @Get('/getOne/:id')
  async getOneData(@Param('id') id) {
    try {
      const data = await this.postService.findOne(id);
      if (!data) throw new Error('Post not found');
      return {
        status: 200,
        message: 'Post fetched successfully',
        data: {
          uuid: data.uuid,
          title: data.title,
          content: data.content,
          publish: data.published,
          image: data.image,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      };
    } catch (error) {
      // error with status 404
      throw new HttpException(
        {
          status: 404,
          error: 'Post not found',
          data: [],
        },
        404,
      );
    }
  }

  /**
   * Add Data
   * @param body
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Post('/add/:uuid')
  async addData(@Param('uuid') uuid, @Body() body: CreatePostDto) {
    try {
      const data = await this.postService.createData(uuid, body);
      return {
        status: 200,
        message: 'Post created successfully',
        data: {
          uuid: data.uuid,
          title: data.title,
          content: data.content,
          publish: data.published,
          image: data.image,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          {
            status: 404,
            error: 'Post not found',
            data: [],
          },
          404,
        );
      }
      throw error;
    }
  }

  /**
   * Update Data
   * @param body
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Post('/update/:uuid')
  async updateData(@Param('uuid') uuid, @Body() body: CreatePostDto) {
    try {
      const data = await this.postService.update(uuid, body);
      return {
        status: 200,
        message: 'Post updated successfully',
        data: {
          uuid: data.uuid,
          title: data.title,
          content: data.content,
          publish: data.published,
          image: data.image,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          {
            status: 404,
            error: 'Post not found',
            data: [],
          },
          404,
        );
      }
      throw error;
    }
  }

  /**
   * Delete Data
   * @param uuid
   * @returns
   */
  @Delete('/delete/:uuid')
  async deleteData(@Param('uuid') uuid) {
    try {
      const data = await this.postService.delete(uuid);
      return {
        status: 200,
        message: `Post deleted successfully with uuid ${data.uuid}`,
        data: [],
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          {
            status: 404,
            error: 'Post not found',
            data: [],
          },
          404,
        );
      }
      throw error;
    }
  }
}
