import { h } from "preact";
import { Container, Menu, Icon, Image, Dropdown } from "semantic-ui-react";

import { PATH_FEED, PATH_USER } from "../../routes";

import s from "./Desktop.scss";

export const DesktopNavigation = ({ url, name, logout: _logout }) => (
  <div className={s.root}>
    <Menu fixed="top" inverted size="large" className={s.menu}>
      <Container>
        <a href={`#${PATH_FEED}`} className="item">
          Home
        </a>
        <Menu.Item position="right">
          <a href={PATH_USER}>
            <Image src={url} size="mini" circular />
          </a>
        </Menu.Item>
        <Dropdown item simple text={name}>
          <Dropdown.Menu>
            <a
              href={`#${PATH_USER}`}
              className="item"
              style={{ color: "black" }}
            >
              Profile
            </a>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => _logout()}>
              <Icon name="log out" />
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  </div>
);

export default DesktopNavigation;
