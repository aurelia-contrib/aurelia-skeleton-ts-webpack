import { bootstrap } from "aurelia-bootstrapper";
import { ComponentTester } from "aurelia-testing";

describe("the navigation view", () => {
  let component: ComponentTester;

  beforeEach(() => {
    const mockRouter = {
      navigation: [
        { title: "Foo", href: "foo", settings: {} },
        { title: "Bar", href: "bar", settings: {} }
      ]
    } as any;

    component = new ComponentTester()
      .withResources("shell/components/navigation")
      .inView("<div><navigation router.bind=\"router\"></navigation></div>")
      .boundTo({ router: mockRouter });
  });

  it("should render each nav item", async () => {
    await component.create(bootstrap);

    const navItems = Array.from(document.querySelectorAll(".nav-link"));
    expect(navItems.length).toBe(2);
  });

  afterEach(() => {
    component.dispose();
  });
});
