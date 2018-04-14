import { singleton } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";

export interface IAlbum {
  id: number;
  title: string;
  userId: number;
}

@singleton()
export class Albums {
  public router: Router;
  public albums: IAlbum[] = [];

  private client: HttpClient;

  constructor(router: Router, client: HttpClient) {
    this.router = router;
    this.client = client;
  }

  public async activate(): Promise<void> {
    if (!this.albums.length) {
      const response = await this.client.fetch("/albums");
      this.albums = await response.json();
    }
  }
}
