import { HttpClient } from "aurelia-fetch-client";
import { FrameworkConfiguration } from "aurelia-framework";
import { configureHttpClient } from "./configure-http-client";

export function configure(config: FrameworkConfiguration): void {
  const client = new HttpClient();
  client.configure(configureHttpClient);
  config.instance(HttpClient, client);
}
