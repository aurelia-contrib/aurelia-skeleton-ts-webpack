import { singleton } from "aurelia-dependency-injection";
import { getLogger } from "aurelia-logging";
import { PLATFORM } from "aurelia-pal";
import {
  ConfiguresRouter,
  NavigationInstruction,
  RoutableComponentActivate,
  RoutableComponentCanActivate,
  RoutableComponentCanDeactivate,
  RoutableComponentDeactivate,
  RouteConfig,
  Router,
  RouterConfiguration
} from "aurelia-router";
import {
  ComponentAttached,
  ComponentBind,
  ComponentCreated,
  ComponentDetached,
  ComponentUnbind,
  View
} from "aurelia-templating";

const logger = getLogger("typicode-app");

@singleton()
export class TypicodeApp
  implements
    ConfiguresRouter,
    RoutableComponentCanActivate,
    RoutableComponentActivate,
    ComponentCreated,
    ComponentBind,
    ComponentAttached,
    RoutableComponentCanDeactivate,
    RoutableComponentDeactivate,
    ComponentDetached,
    ComponentUnbind {
  public router: Router;

  constructor(router: Router) {
    logger.debug("constructor", this);
    this.router = router;
  }

  public async configureRouter(config: RouterConfiguration, router: Router): Promise<void> {
    logger.debug("configureRouter", this, config, router);
    config.map([
      {
        route: ["", "todos"],
        name: "todos",
        title: "Todos",
        nav: 0,
        moduleId: PLATFORM.moduleName("application/typicode/todos")
      },
      {
        route: "comments",
        name: "comments",
        title: "Comments",
        nav: 0,
        moduleId: PLATFORM.moduleName("application/typicode/comments")
      },
      {
        route: "posts",
        name: "posts",
        title: "Posts",
        nav: 0,
        moduleId: PLATFORM.moduleName("application/typicode/posts")
      },
      {
        route: "users",
        name: "users",
        title: "Users",
        nav: 0,
        moduleId: PLATFORM.moduleName("application/typicode/users")
      },
      {
        route: "albums",
        name: "albums",
        title: "Albums",
        nav: 0,
        moduleId: PLATFORM.moduleName("application/typicode/albums")
      },
      {
        route: "photos",
        name: "photos",
        title: "Photos",
        nav: 0,
        moduleId: PLATFORM.moduleName("application/typicode/photos")
      }
    ]);
    this.router = router;
  }

  public async canActivate(
    params: any,
    routeConfig: RouteConfig,
    navigationInstruction: NavigationInstruction
  ): Promise<boolean> {
    logger.debug("canActivate", this, params, routeConfig, navigationInstruction);

    return true;
  }

  public async activate(
    params: any,
    routeConfig: RouteConfig,
    navigationInstruction: NavigationInstruction
  ): Promise<void> {
    logger.debug("activate", this, params, routeConfig, navigationInstruction);

    routeConfig.settings.childRouter = this.router;
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

  public async canDeactivate(): Promise<boolean> {
    logger.debug("canDeactivate", this);

    return true;
  }

  public async deactivate(): Promise<void> {
    logger.debug("deactivate", this);

    this.router.currentInstruction.parentInstruction.config.settings.childRouter = null;
  }

  public detached(): void {
    logger.debug("detached", this);
  }

  public unbind(): void {
    logger.debug("unbind", this);
  }
}
