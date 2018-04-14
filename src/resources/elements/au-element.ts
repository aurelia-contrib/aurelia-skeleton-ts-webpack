import { getLogger } from "aurelia-logging";
import {
  ComponentAttached,
  ComponentBind,
  ComponentCreated,
  ComponentDetached,
  ComponentUnbind,
  customElement,
  View
} from "aurelia-templating";

const logger = getLogger("au-element");

@customElement("au-element")
export class AuElement {
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
