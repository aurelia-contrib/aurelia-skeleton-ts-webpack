// tslint:disable:import-name
import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import env from "./environment";

Promise.config({ warnings: { wForgottenReturn: false } });

export async function configure(au: Aurelia): Promise<void> {
  au.use.standardConfiguration();

  if (env.debug || env.testing) {
    au.use
      .developmentLogging()
      .plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  au.use
    .feature(PLATFORM.moduleName("resources/index"))
    .feature(PLATFORM.moduleName("common/index"));

  const host = document.querySelector("[aurelia-app]");

  await au.start();
  await au.setRoot(PLATFORM.moduleName("shell/app"), host);
}
