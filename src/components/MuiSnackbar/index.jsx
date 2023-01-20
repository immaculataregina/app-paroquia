import { useEffect, useState, useContext } from 'react';
import { Alert, Snackbar, Stack } from '@mui/material';
import { AppContext } from '../../contexts/AppContext';

export default function MuiSnackbar(props) {
  const [open, setOpen] = useState(false);

  const { appState, appDispatch } = useContext(AppContext);

  useEffect(() => {
    if (appState.alert) {
      handleClick();
    }
  }, [appState, appState.alert]);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      appDispatch({ type: 'HANDLE_ALERT', alert: 0 });
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