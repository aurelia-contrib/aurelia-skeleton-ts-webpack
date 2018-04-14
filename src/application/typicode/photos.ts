import { singleton } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";

export interface IPhoto {
  id: number;
  title: string;
  color: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

@singleton()
export class Photos {
  public router: Router;
  public photos: IPhoto[] = [];

  private client: HttpClient;

  constructor(router: Router, client: HttpClient) {
    this.router = router;
    this.client = client;
  }

  public async activate(): Promise<void> {
    if (!this.photos.length) {
      const response = await this.client.fetch("/photos");
      this.photos = await response.json();
    }
  }
}
