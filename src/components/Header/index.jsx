import React from 'react';

import { AppBar, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';


import { theme } from '../../App';
import useRouter from '../../services/hooks/useRouter';

export default function Header(props) {

  const router = useRouter();

  const { history } = router;

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      flexGrow: '0.5',
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '85%',
        '&:focus': {
          width: '100%',
        },
      },
    },
  }));

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => history.goBack()}
            sx={{ mr: 2 }}
          >
            <Icons.ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 2, fontSize: '1.2em'}}
          >
            {props.title}
          </Typography>
          {!props.noSearch && (
            <Search>
              <SearchIconWrapper>
                <Icons.Search />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Pesquisar..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}
        </Toolbar>
      </AppBar>
      <div
        style={{padding: theme.spacing(1), maxWidth: '900px', margin: '0 auto' }}
      >
      </div>
    </>
  )
}
