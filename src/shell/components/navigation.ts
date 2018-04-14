import { Router } from "aurelia-router";
import { bindable, customElement } from "aurelia-templating";

@customElement("navigation")
export class Navigation {
  @bindable()
  public router: Router;

  @bindable()
  public childRouter: Router;
}
