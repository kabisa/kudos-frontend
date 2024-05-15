import { render, fireEvent } from "@testing-library/react";
import { Dropdown, DropdownMenuItem } from ".";

describe("Dropdown Component", () => {
  it("should display the dropdown menu when clicked", () => {
    const { queryByText, getByRole } = render(
      <Dropdown label="Dropdown Label">
        <DropdownMenuItem label="Item 1" />
      </Dropdown>,
    );

    expect(queryByText("Item 1")).toBeNull();

    const dropdownButton = getByRole("button", { name: "Dropdown Label" });
    fireEvent.click(dropdownButton);

    expect(getByRole("menuitem", { name: "Item 1" })).toBeInTheDocument();
  });

  it("should render an icon when passed", () => {
    const iconName = "man";

    const { getByText, getByRole } = render(
      <Dropdown label="Dropdown Label">
        <DropdownMenuItem label="Item 1" iconName={iconName} />
      </Dropdown>,
    );

    const dropdownButton = getByRole("button", { name: "Dropdown Label" });
    fireEvent.click(dropdownButton);

    expect(getByText(iconName)).toBeInTheDocument();
  });
});
