import { singleton } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";

export interface IComment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

@singleton()
export class Comments {
  public router: Router;
  public comments: IComment[] = [];

  private client: HttpClient;

  constructor(router: Router, client: HttpClient) {
    this.router = router;
    this.client = client;
  }

  public async activate(): Promise<void> {
    if (!this.comments.length) {
      const response = await this.client.fetch("/comments");
      this.comments = await response.json();
    }
  }
}
