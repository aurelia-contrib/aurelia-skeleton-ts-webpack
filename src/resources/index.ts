import { FrameworkConfiguration } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";

export function configure(config: FrameworkConfiguration): void {
  config
    .feature(PLATFORM.moduleName("resources/attributes/index"))
    .feature(PLATFORM.moduleName("resources/behaviors/index"))
    .feature(PLATFORM.moduleName("resources/converters/index"))
    .feature(PLATFORM.moduleName("resources/elements/index"));
}
