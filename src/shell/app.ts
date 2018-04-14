import { getLogger } from "aurelia-logging";
import { PLATFORM } from "aurelia-pal";
import { AppRouter, ConfiguresRouter, RouterConfiguration } from "aurelia-router";
import {
  ComponentAttached,
  ComponentBind,
  ComponentCreated,
  ComponentDetached,
  ComponentUnbind,
  View
} from "aurelia-templating";

const logger = getLogger("app");

export class App
  implements ConfiguresRouter, ComponentCreated, ComponentBind, ComponentAttached, ComponentDetached, ComponentUnbind {
  public router: AppRouter;

  constructor() {
    logger.debug("constructor", this);
  }

  public activate(): void {
    logger.debug("activate", this);
  }

  public async configureRouter(config: RouterConfiguration, router: AppRouter): Promise<void> {
    logger.debug("configureRouter", this, config, router);
    config.map([
      {
        route: "",
        name: "home",
        title: "Home",
        nav: 0,
        moduleId: PLATFORM.moduleName("application/home/home-app")
      },
      {
        route: "typicode",
        name: "typicode",
        title: "Typicode",
        nav: 1,
        moduleId: PLATFORM.moduleName("application/typicode/typicode-app")
      }
    ]);
    this.router = router;
  }

  public created(owningView: View, myView: View): void {
    logger.debug("created", this, owningView, myView);
  }

  public bind(bindingContext: any, overrideContext: any): void {
    logger.debug("bind", this, bindingContext, overrideContext);
  }

  public attached(): void {
    logger.debug("attached", this);
  }

  public detached(): void {
    logger.debug("detached", this);
  }

  public unbind(): void {
    logger.debug("unbind", this);
  }
}
