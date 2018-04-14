import { Binding, bindingBehavior, Scope } from "aurelia-binding";
import { getLogger } from "aurelia-logging";

const logger = getLogger("au-behavior");

@bindingBehavior("auBehavior")
export class AuBehavior {
  constructor() {
    logger.debug("constructor", this);
  }

  public bind(binding: Binding, scope: Scope, arg: any): void {
    logger.debug("bind", this, binding, scope, arg);
  }

  public unbind(binding: Binding, scope: Scope): void {
    logger.debug("unbind", this, binding, scope);
  }
}
