import {
  Anchor,
  Box,
  Grommet,
  Header,
  Menu,
  Nav,
  ResponsiveContext,
} from 'grommet';

import { Link } from 'react-router-dom';
import React from 'react';
import theme from '../themes/base';

type LayoutProps = {
  children: React.ReactNode;
};

function NavHeader() {
  return (
    <Header background="dark-1" pad="medium">
      <Box direction="row" align="center" gap="small">
        Title in the Nav
      </Box>
      <ResponsiveContext.Consumer>
        {(responsive) => (responsive === 'small' ? (
          <Menu
            label="Menu"
            items={[
              { label: 'Menu Item 1', onClick: () => {} },
              { label: 'Menu Item 2', onClick: () => {} },
              { label: 'Menu Item 3', onClick: () => {} },
            ]}
          />
        ) : (
          <Nav direction="row">
            <Anchor href="#" label="Menu Item 1" />
            <Anchor href="#" label="Menu Item 2" />
            <Anchor href="#" label="Menu Item 3" />
          </Nav>
        ))}
      </ResponsiveContext.Consumer>
    </Header>
  );
}

function Layout({ children }: LayoutProps) {
  return (
    <Grommet
      theme={theme}
      full
    >
      <NavHeader />
      <Link to="/">
        <h1>
          Link to the home page
        </h1>
      </Link>
      {children}
    </Grommet>
  );
}

export default Layout;
