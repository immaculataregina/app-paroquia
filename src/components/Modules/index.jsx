import { createElement, useMemo } from 'react';

import * as Icons from '@mui/icons-material';

import { theme } from '../../App';

export default function Modules(props) {

  const modules = useMemo(() => {
    // const tempItensMenu = props.itens_menu;
    const tempItensMenu = [
      'Pessoas', 'Dízimo', 'Eventos'
    ];
    const modulesPermission = tempItensMenu.map(item => {
      switch (item) {
        case 'Pessoas':
          return {
            nome: item,
            slug: 'pessoas',
            icon: 'Notifications'
          }
        case 'Dízimo':
          return {
            nome: item,
            slug: 'dizimo',
            icon: 'VolunteerActivism'
          }
        case 'Eventos':
          return {
            nome: item,
            slug: 'eventos',
            icon: 'Church'
          }
        default:
          break;
      }
    })

    return (
      <>
        {modulesPermission.map(module => {
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
              <span
                style={{ fontSize: '3vmin' }}
              >{module.nome}</span>
            </a>
          )
        }
      )}
    </>
    )
  }, []);

  return (
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
  )
}
