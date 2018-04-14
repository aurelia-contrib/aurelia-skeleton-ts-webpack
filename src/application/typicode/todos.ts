import { singleton } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

@singleton()
export class Todos {
  public router: Router;
  public todos: ITodo[] = [];

  private client: HttpClient;

  constructor(router: Router, client: HttpClient) {
    this.router = router;
    this.client = client;
  }

  public async activate(): Promise<void> {
    if (!this.todos.length) {
      const response = await this.client.fetch("/todos");
      this.todos = await response.json();
    }
  }
}
