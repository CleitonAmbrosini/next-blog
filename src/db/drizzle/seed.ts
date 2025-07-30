import { eq } from 'drizzle-orm';
import { db } from '.';
import { postsTable } from './schemas';
import data from '../seed/posts.json';
import dotenv from 'dotenv';
dotenv.config();

export async function seedPosts() {
  const items = data.posts;

  for (const post of items) {
    const exists = await db
      .select({ id: postsTable.id })
      .from(postsTable)
      .where(eq(postsTable.id, post.id));

    if (exists.length === 0) {
      await db.insert(postsTable).values({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImageUrl: post.coverImageUrl,
        published: post.published,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: post.author,
      });
    }
  }

  console.log(`✅ Inseridos ${items.length} posts`);
}
