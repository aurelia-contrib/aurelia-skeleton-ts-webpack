import { valueConverter } from "aurelia-binding";
import { getLogger } from "aurelia-logging";

const logger = getLogger("au-converter");

@valueConverter("auConverter")
export class AuConverter {
  constructor() {
    logger.debug("constructor", this);
  }

  public toView(valueFromViewModel: any, arg1: any, arg2: any): any {
    logger.debug("toView", this, valueFromViewModel, arg1, arg2);

    return valueFromViewModel;
  }

  public fromView(valueFromView: any, arg1: any, arg2: any): any {
    logger.debug("fromView", this, valueFromView, arg1, arg2);

    return valueFromView;
  }
}
