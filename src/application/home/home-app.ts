import { autoinject } from "aurelia-dependency-injection";
import { getLogger } from "aurelia-logging";
import { PLATFORM } from "aurelia-pal";
import {
  NavigationInstruction,
  RoutableComponentActivate,
  RoutableComponentCanActivate,
  RoutableComponentCanDeactivate,
  RoutableComponentDeactivate,
  RouteConfig,
  Router
} from "aurelia-router";
import {
  ComponentAttached,
  ComponentBind,
  ComponentCreated,
  ComponentDetached,
  ComponentUnbind,
  View
} from "aurelia-templating";

const logger = getLogger("home-app");

@autoinject()
export class HomeApp
  implements
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
  }

  public detached(): void {
    logger.debug("detached", this);
  }

  public unbind(): void {
    logger.debug("unbind", this);
  }
}
