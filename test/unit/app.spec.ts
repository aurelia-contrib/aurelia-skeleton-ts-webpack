import { RouterConfiguration } from "aurelia-router";
import { App } from "../../src/shell/app";

describe("configureRouter()", () => {
  let sut: App;

  beforeEach(() => {
    sut = new App();
  });

  it("should add two routes", () => {
    const config = new RouterConfiguration();
    const mockRouter = jasmine.createSpyObj("router", ["addRoute", "createNavModel"]);

    sut.configureRouter(config, mockRouter);
    config.exportToRouter(mockRouter);

    expect(mockRouter.addRoute).toHaveBeenCalledTimes(2);
  });
});
