import { useEffect, useState, useContext } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import { AppContext } from '../../contexts/AppContext';

export default function MuiDialog(props) {
  const [open, setOpen] = useState(false);

  const { appState, appDispatch } = useContext(AppContext);

  useEffect(() => {
    if (appState.dialog) {
      handleClick();
    }

    if (!appState.dialog) {
      handleClose();
    }
  }, [appState, appState.dialog]);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      appDispatch({ type: 'HANDLE_DIALOG', dialog: 0 });
      return;
    }

    setOpen(false);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.title}</DialogTitle>
      {props.children}
    </Dialog>
  )
}