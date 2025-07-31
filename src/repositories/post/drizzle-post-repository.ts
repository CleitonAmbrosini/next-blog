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

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await db.query.postsTable.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.slug, slug), eq(posts.published, true)),
    });

    if (!post) throw new Error('No post found with this Slug.');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    return await db.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
  }

  async findById(id: string): Promise<PostModel> {
    const post = await db.query.postsTable.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('No post found with this ID.');

    return post;
  }
}
