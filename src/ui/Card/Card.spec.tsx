import { screen } from "@testing-library/react";
import { Card } from ".";
import { setTestSubject } from "../../support/testing/testSubject";

describe("Card", () => {
  const { renderComponent, updateProps } = setTestSubject(Card, {
    props: {
      title: { text: "Kudometer" },
      content: "content",
    },
  });

  test("given an icon name, renders an icon", () => {
    updateProps({ title: { text: "Kudometer", iconName: "flag" } });
    renderComponent();

    screen.getByText("Kudometer");
    screen.getByText("flag");
  });

  test("render a default card with mandatory settings", () => {
    renderComponent();

    screen.getByText("Kudometer");
    screen.getByText("content");
  });
});
