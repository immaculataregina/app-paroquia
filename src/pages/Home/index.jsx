import { createElement, useContext, useMemo } from 'react';

import { Button } from '@mui/material';
import { Notifications, VolunteerActivism, Church } from '@mui/icons-material';
import * as Icons from '@mui/icons-material';


import { theme } from '../../App';
import { LoginContext } from '../../contexts/LoginContext';

export default function Home() {
  const { logout } = useContext(LoginContext);

  const modules = useMemo(() => {
    const modulesPermission = [
      {
        nome: 'Avisos',
        slug: 'avisos',
        icon: 'Notifications'
      },
      {
        nome: 'Dízimo',
        slug: 'dizimo',
        icon: 'VolunteerActivism'
      },
      {
        nome: 'Horários de Missa e Atendimento',
        slug: 'horarios',
        icon: 'Church'
      },
    ]

    return (
      <>
        {modulesPermission.map(module => {
          const CustomIcon = `${module.icon}`;

          return (
            <a 
              href="#"
              style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '5vmin 4vmin 4vmin', color: '#414141', textAlign: 'center', textDecoration: 'none', overflow: 'hidden'
              }}  
            >
              <span  
                style={{
                  display: 'flex', flexDirection: 'center', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', marginBottom: theme.spacing(1), width: '20vmin', maxWidth: '100px', height: '20vmin', maxHeight: '100px',
                  borderRadius: '50%', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText
                }}
              >
                {/* <CustomIcon /> */}
                {createElement(Icons[module.icon])}
              </span>
              <span>{module.nome}</span>
            </a>
          )
        }
      )}
    </>
    )
  }, []);

  return (
    <div
      style={{padding: theme.spacing(4), maxWidth: '900px', margin: '0 auto' }}
    >
      <div
        style={{ position: 'absolute', top: '2vmin', right: 0 }}
      >
        <Button onClick={logout}>Sair</Button>
      </div>
      <header
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '1vh', paddingBottom: '5vh', textAlign: 'center' }}
      >
        <figure
          style={{ 
            display: 'flex', width: '45vmin', maxWidth: '250px', height: '45vmin', maxHeight: '250px', borderRadius: '50%', overflow: 'hidden',
            margin: theme.spacing(2)
          }}
        >
          <img alt src="https://cdn.pixabay.com/photo/2016/11/29/20/22/girl-1871104_1280.jpg" />
        </figure>
        <p style={{ fontSize: '4vmin', fontWeight: 'bold', marginBottom: theme.spacing(1) }}>Olá, Gabriel</p>
        <span style={{ fontSize: '2vmin', fontStyle: 'italic'}}>Que a paz de Nosso Senhor esteja com você!</span>
      </header>

      {/* Navigation */}
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
        {modules}
      </div>
    </div>
  )
}
