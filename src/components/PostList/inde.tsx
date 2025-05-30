import type { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';

export async function PostList() {
  const posts = await postRepository.findAll();

  return (
    <>
      {posts.map((post: PostModel) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  );
}
