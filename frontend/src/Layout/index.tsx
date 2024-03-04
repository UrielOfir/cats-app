// src/components/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Change React.FC[] to React.ReactNode for the children prop
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,  }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              CRAZY CATS
            </Link>
          </Typography>

        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
