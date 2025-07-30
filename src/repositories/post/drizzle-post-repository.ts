import { db } from '@/db/drizzle';
import type { PostModel } from '@/models/post/post-model';
import type { PostRepository } from './post-repository';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    return await db.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });
  }

  async findBySlugPublic(slug: string): Promise<PostModel | undefined> {
    return await db.query.postsTable.findFirst({
      where: (posts, { eq }) => eq(posts.slug, slug),
    });
  }

  async findAll(): Promise<PostModel[]> {
    return await db.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
  }

  async findById(id: string): Promise<PostModel | undefined> {
    return await db.query.postsTable.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
  }
}
