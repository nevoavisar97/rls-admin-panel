import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { selectAuth } from 'src/redux/authSlice';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useSelector(selectAuth); // Assuming selectAuth returns an object with user details
  console.log(user);
  
  const isAdmin = user === 'ad001'; // Check if the user is an admin
  console.log(isAdmin);
  
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {!isAdmin && (
          <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        )}

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
