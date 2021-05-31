import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/cworks-logo.png"
            alt="logo"
            style={{ marginRight: '10px', width: '170px' }}
          />
        </Menu.Item>
        <Menu.Item name="Vehicle" as={NavLink} to="/vehicle" />
        <Menu.Item name="Manufacturers" as={Link} to="/manufacturer" />
        <Menu.Item name="Categories" as={Link} to="/categories" />
        <Menu.Item position="right" as={Link} to="/user">
          <Button primary color="google plus">
            User View
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
