import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';


export default function SelectButton(props) {
  const TagType = props.href ? 'a' : 'button';
  const hasIcon = !!props.icon;

  const StyledButton = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    
    border: 0,
    borderRadius: '8px',
  
    background: 'linear-gradient(180deg, #DAE8FC, #B1C1DA)',
    fontWeight: 400,
    color: '#000',
    textDecoration: 'none',
    appearance: 'none',
  
    boxShadow: '0 2px 2px rgba(0,0,0,0.3)',
    transition: '200ms linear',

    marginBottom: theme.spacing(4),

    '&:hover': {
      background: 'linear-gradient(180deg, #DAE8FC, #7492C2)',
  
      cursor: 'pointer',
      transition: '200ms linear',
    },

    '&:active': {
      background: 'linear-gradient(180deg, #DAE8FC, #7492C2)',
  
      cursor: 'pointer',
      transition: '200ms linear',
    }
  }));

  return (
    <StyledButton
      as={TagType}
      href={props.href}
      target={props.hred && '_BLANK'}
      onClick={() => console.log('cliquei')}
    >
      <Typography fontSize="2rem" paddingLeft={1}>
        {props.children}
      </Typography>
    </StyledButton>
  )
}