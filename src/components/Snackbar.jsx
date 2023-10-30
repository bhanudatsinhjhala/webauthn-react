import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({ snackbarMessage, handleSnackbar, toggleSnackbar}) {

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
      className='snackbar-position'
        open={toggleSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbar}
        message={snackbarMessage}
        action={action}
      />
    </div>
  );
}
