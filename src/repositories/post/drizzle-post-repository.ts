import { db } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';
import type { PostModel } from '@/models/post/post-model';
import { asyncDelay } from '@/utils/async-delay';
import { eq } from 'drizzle-orm';
import type { PostRepository } from './post-repository';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    return await db.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    const post = await db.query.postsTable.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.slug, slug), eq(posts.published, true)),
    });

    if (!post) throw new Error('No post found with this Slug.');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    return await db.query.postsTable.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    const post = await db.query.postsTable.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('No post found with this ID.');

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await db.query.postsTable.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists)
      throw new Error('The post with the same ID or SLUG already exists.');

    await db.insert(postsTable).values(post);
    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const post = await db.query.postsTable.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post not found.');

    await db.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await db.query.postsTable.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post not found');
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };
    await db.update(postsTable).set(postData).where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
}
