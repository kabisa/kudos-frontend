import React from "react";
import Navigation from ".";
import { render } from "@testing-library/react";

jest.mock("../breakpoints", () => ({
  isDesktopQuery: "(min-width: 768px)",
}));

type WrapperProps = {
  isDesktop?: boolean;
};

const Wrapper = ({ isDesktop = false }: WrapperProps) => {
  return <Navigation>{() => (isDesktop ? "Desktop" : "Mobile")}</Navigation>;
};

test("renders desktop navigation", () => {
  const { getByText } = render(<Wrapper isDesktop={true} />);
  expect(getByText("Desktop")).toBeInTheDocument();
});

test("renders mobile navigation", () => {
  const { getByText, queryByText } = render(<Wrapper isDesktop={false} />);
  expect(getByText("Mobile")).toBeInTheDocument();
  expect(queryByText("Desktop")).not.toBeInTheDocument();
});
