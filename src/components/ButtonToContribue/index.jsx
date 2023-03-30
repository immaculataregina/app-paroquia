import { Typography } from '@mui/material';
import React, { createElement, memo } from 'react';
import { styled } from '@mui/material/styles';
import { ArrowForwardIos } from '@mui/icons-material';


import SelectButton from './components/SelectButton';
import { theme } from '../../App';

export default function ButtonToContribue(props) {
  const SelectButtonContributeContainer = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr .3fr',
    padding: theme.spacing(3),
    textAlign: 'left',
    minHeight: '170px',
    marginBottom: theme.spacing(3),

    '> div': {
      margin: 'auto 0',
    },

  }));
  
  const IconStyled = styled(ArrowForwardIos)(({ theme }) => ({
    alignSelf: 'center',
    justifySelf: 'end',
    width: '64px',
    height: '64px',
    fill: theme.palette.primary.main,
    opacity: '.3'
  }));

  return (
    <SelectButton>
      <SelectButtonContributeContainer>
        <div>
          <Typography color={theme.palette.primary.main} fontSize="18px" marginBottom="1rem" fontFamily="Montserrat-Bold">{props.title}</Typography>
          <Typography fontSize="14px" color="#333" fontFamily="Montserrat">{props.text}</Typography>
        </div>
        <IconStyled />
      </SelectButtonContributeContainer>
    </SelectButton>
  )
}