import type { PostModel } from "@/models/post/post-model";
import { readFile } from "fs/promises";
import { resolve } from "path";
import type { PostRepository } from "./post-repository";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json"
);

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const { posts } = JSON.parse(jsonContent);
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.find((post) => post.id === id);
    if (!post) throw new Error("No post found with this ID.");
    return post;
  }
}

postRepository.findAll().then((posts) => {
  posts.forEach((post) => {
    console.log(post.id);
  });
});

postRepository
  .findById("bc9a540f-66a9-4ab0-8d50-6216ab1cac533")
  .then((post) => console.log(post));
