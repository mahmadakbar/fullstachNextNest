import { Prisma } from '@prisma/client';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto implements Prisma.PostCreateInput {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;
}
