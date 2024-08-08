import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------

export default function UserTableToolbar({  filterName, onFilterName }) {


  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        
      }}
    >
      
        <Typography
          component="div"
          variant="subtitle1"
          sx={{ color: 'white' }}
        >
          Lecturers Control Panel
        </Typography>
     
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
