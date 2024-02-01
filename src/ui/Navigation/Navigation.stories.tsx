import React from "react";
import type { Meta } from "@storybook/react";
import Navigation, { NavigationProps } from "./";
import { Icon, Link } from "@kabisa/ui-components";

export const NavigationStory = (props: NavigationProps) => (
  <Navigation {...props}>
    {(isDesktop) => (isDesktop ? <DesktopNav /> : <MobileNav />)}
  </Navigation>
);

const DesktopNav = () => (
  <>
    <li>
      <Link theme="light" href="https://google.com">
        Home
      </Link>
    </li>
    <li>
      <Link theme="light" href="https://google.com">
        Home
      </Link>
    </li>
  </>
);

const MobileNav = () => (
  <>
    <li>
      <Link theme="light" href="https://google.com">
        <Icon name="home" />
      </Link>
    </li>
    <li>
      <Link theme="light" href="https://google.com">
        <Icon name="home" />
      </Link>
    </li>
    <li>
      <Link theme="light" href="https://google.com">
        <Icon name="home" />
      </Link>
    </li>
    <li>
      <Link theme="light" href="https://google.com">
        <Icon name="home" />
      </Link>
    </li>
  </>
);

const meta: Meta<typeof Navigation> = {
  component: Navigation,
  argTypes: {},
  args: {},
};

export default meta;
