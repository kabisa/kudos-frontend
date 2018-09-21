import React from 'react';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';

export default () => {
  const fixed = false;
  return (
    <div style={{ position: 'fixed', top: 0, width: '100%' }}>
      <Segment inverted textAlign="center" style={{ padding: '1em 0em' }} vertical>
        <Menu
          fixed={fixed ? 'top' : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item as="a" active>
              Kudos-o-Matic
            </Menu.Item>
            <Menu.Item as="a">Goals</Menu.Item>
            <Menu.Item as="a">Group</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item position="right">
              <Button as="a" inverted={!fixed}>
                Log in
              </Button>
              <Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                Sign Up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    </div>
  );
};
