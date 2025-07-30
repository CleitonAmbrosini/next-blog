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

  async findBySlugPublic(slug: string): Promise<PostModel> {}

  async findAll(): Promise<PostModel[]> {}

  async findById(id: string): Promise<PostModel> {}
}

(async () => {
  const repo = new DrizzlePostRepository();

  const data = await repo.findAllPublic();

  console.log(data);
})();
