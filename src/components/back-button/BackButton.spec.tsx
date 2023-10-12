import { render, screen } from "@testing-library/react";

import { Context as ResponsiveContext } from "react-responsive";
import BackButton from "./BackButton";

export type Breakpoint = "mobile" | "desktop";

export const breakpoints: { [key in Breakpoint]: number } = {
  mobile: 0,
  desktop: 1200,
};

const MediaWrapper = ({
  screen,
  children,
}: {
  children: React.ReactNode;
  screen: "mobile" | "desktop";
}) => (
  <ResponsiveContext.Provider value={{ width: breakpoints[screen] }}>
    {children}
  </ResponsiveContext.Provider>
);

test("backButton", async () => {
  render(
    <MediaWrapper screen="desktop">
      <BackButton />
    </MediaWrapper>,
  );
});
// describe.only("<BackButton />", () => {
//   let wrapper: ReactWrapper;

//   beforeEach(() => {
//     wrapper = mount(
//       // Because the component is wrapped with react-responsive components we need
//       // to provide a mock value for the browser width.
//       <ResponsiveContext.Provider value={{ width: 1200 }}>
//         <BackButton />
//       </ResponsiveContext.Provider>,
//     );
//   });

//   it("render the correct text", () => {
//     expect(wrapper.contains("Back")).toBe(true);
//   });
// });
