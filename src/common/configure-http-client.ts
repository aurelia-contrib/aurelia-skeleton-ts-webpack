import { HttpClientConfiguration } from "aurelia-fetch-client";
import { getLogger } from "aurelia-logging";

export function configureHttpClient(clientConfig: HttpClientConfiguration): void {
  const logger = getLogger("http-client");

  clientConfig
    .withBaseUrl("https://jsonplaceholder.typicode.com")
    .withDefaults({
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .withInterceptor({
      request: req => {
        logger.debug("request", req);

        return req;
      },
      requestError: err => {
        logger.error("requestError", err);

        return err;
      },
      response: (resp, req) => {
        logger.debug("request", resp, req);

        return resp;
      },
      responseError: (err, req) => {
        logger.error("responseError", err, req);

        return err;
      }
    });
}
