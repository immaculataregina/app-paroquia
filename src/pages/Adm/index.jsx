import { createElement, useCallback, useContext, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';

import {isMobile} from 'react-device-detect';

import { LoginContext } from '../../contexts/LoginContext';
import { AppContext } from '../../contexts/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import MuiTable from '../../components/MuiTable';

import Switch from '@mui/material/Switch';
import { Button, Stack, Typography } from '@mui/material';


const testValues = [
  {
    key: 'Nome',
    value: 'Gabriel Pereira'
  },
  {
    key: 'Idade',
    value: '24 anos'
  },
  {
    key: 'Dizimista',
    value: 'Sim'
  }
]

const cardsValues = [
  {
    testValues
  },
  {
    testValues
  },
  {
    testValues
  },
]

function createData(
  title,
  name,
  age,
  dizimist
) {
  return { title, name, age, dizimist };
}

const rows = [
  createData('Principal', 'Gabriel Pereira', '24 anos', 'Sim'),
  createData('Principal', 'Gabriel Pereira', '24 anos', 'Sim'),
  createData('Principal', 'Gabriel Pereira', '24 anos', 'Sim'),
];


export default function Adm() {
  const { logout, loginState } = useContext(LoginContext);
  const { appDispatch } = useContext(AppContext);
  const [displayTable, setDisplayTable] = useState(isMobile ? false : true);

  const Container = styled('div')(({ theme }) => ({
    margin: `0 ${theme.spacing(2)}`,
  }));

  const Switcher = styled(Stack)(({ theme }) => ({
    justifyContent: 'right',
    '& .MuiTypography-body1': {
      fontSize: '0.8em'
    }
  }));

  const ActionContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  }));

  return (
    <>
      <Header title="Administração" />
      <div
        style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 33.3%))',
          alignItems: 'baseline',
          padding: '0 3vmin',
          background: '#FFF',
          minWidth: '100%',
        }}
      >
        {/* {modules} */}
      </div>
      <Container>
        <ActionContainer>
          <Button variant="contained">Adicionar Nova Linha</Button>
          <Switcher direction="row" alignItems="center">
            <Typography>Card</Typography>
            <Switch checked={displayTable} onClick={(ev) => setDisplayTable(ev.target.checked)} />
            <Typography>Tabela</Typography>
          </Switcher>
        </ActionContainer>
        
        {displayTable ? (
          <MuiTable />
        ) : (
          cardsValues.map((card, key) => <Card key={key} contents={card.testValues}/> )
        )}
      </Container>
    </>
  )
}
