import type { PostModel } from '@/models/post/post-model';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import type { PostRepository } from './post-repository';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);


export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise(resolve => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const { posts } = JSON.parse(jsonContent);
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    await this.simulateWait();
    const posts = await this.readFromDisk();
    return posts.filter(post => post.published === true);
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateWait();
    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);
    if (!post) throw new Error('No post found with this ID.');
    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);
    if (!post) throw new Error('No post found with this slug.');
    return post;
  }
}
