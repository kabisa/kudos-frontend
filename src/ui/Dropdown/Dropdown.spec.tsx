import { screen, fireEvent } from "@testing-library/react";
import { Dropdown, DropdownMenuItem } from ".";
import { Decorator, setComponent } from "../../support/testing/testComponent";

const dropdownDecorator: Decorator<"dropdown"> = {
  name: "dropdown",
  settings: {},
  Decorator: ({ Component }) => (
    <Dropdown label="Dropdown Label">
      <Component />
    </Dropdown>
  ),
};

describe("Dropdown Component", () => {
  const { renderComponent, updateProps } = setComponent(DropdownMenuItem, {
    decorators: [dropdownDecorator],
    props: {
      label: "Item 1",
    },
  });

  it("should display the dropdown menu when clicked", () => {
    renderComponent();

    expect(screen.queryByText("Item 1")).toBeNull();
    const dropdownButton = screen.getByRole("button", {
      name: "Dropdown Label",
    });
    fireEvent.click(dropdownButton);

    expect(
      screen.getByRole("menuitem", { name: "Item 1" }),
    ).toBeInTheDocument();
  });

  it("should render an icon when passed", () => {
    updateProps({ iconName: "man" });
    renderComponent();

    const dropdownButton = screen.getByRole("button", {
      name: "Dropdown Label",
    });
    fireEvent.click(dropdownButton);
    expect(screen.getByText("man")).toBeInTheDocument();
  });
});
