import { singleton } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";

export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@singleton()
export class Photos {
  public router: Router;
  public posts: IPost[] = [];

  private client: HttpClient;

  constructor(router: Router, client: HttpClient) {
    this.router = router;
    this.client = client;
  }

  public async activate(): Promise<void> {
    if (!this.posts.length) {
      const response = await this.client.fetch("/posts");
      this.posts = await response.json();
    }
  }
}
