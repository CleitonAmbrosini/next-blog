import { JsonPostRepository } from './json-post-repository';
import type { PostRepository } from './post-repository';

export const postRepository: PostRepository = new JsonPostRepository();
