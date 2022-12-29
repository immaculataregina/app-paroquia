import { useEffect, useState } from 'react';
import { Alert, Snackbar, Stack } from '@mui/material';

export default function MuiSnackbar(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.trigger) {
      handleClick();
    }
  }, [props.trigger]);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity={props.type} onClose={handleClose}>{props.message}</Alert>
      </Stack>
    </Snackbar>
  )
}