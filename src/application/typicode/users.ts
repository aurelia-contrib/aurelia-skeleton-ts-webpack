import { singleton } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";

export interface IUser {
  id: number;
  title: string;
  body: string;
}

@singleton()
export class Users {
  public router: Router;
  public users: IUser[] = [];

  private client: HttpClient;

  constructor(router: Router, client: HttpClient) {
    this.router = router;
    this.client = client;
  }

  public async activate(): Promise<void> {
    if (!this.users.length) {
      const response = await this.client.fetch("/users");
      this.users = await response.json();
    }
  }
}
