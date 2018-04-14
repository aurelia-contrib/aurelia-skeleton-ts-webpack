import { getLogger } from "aurelia-logging";
import {
  ComponentAttached,
  ComponentBind,
  ComponentCreated,
  ComponentDetached,
  ComponentUnbind,
  customAttribute,
  View
} from "aurelia-templating";

const logger = getLogger("au-attribute");

@customAttribute("au-attribute")
export class AuAttribute
  implements ComponentCreated, ComponentBind, ComponentAttached, ComponentDetached, ComponentUnbind {
  constructor() {
    logger.debug("constructor", this);
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
