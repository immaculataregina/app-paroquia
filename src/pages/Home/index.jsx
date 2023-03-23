import { createElement, useCallback, useContext, useMemo, useState } from 'react';

import { Button } from '@mui/material';
import * as Icons from '@mui/icons-material';

import Avatar from 'react-avatar-edit';

import { theme } from '../../App';
import { LoginContext } from '../../contexts/LoginContext';
import MuiDialog from '../../components/MuiDialog';
import { AppContext } from '../../contexts/AppContext';

export default function Home() {
  const { logout, loginState } = useContext(LoginContext);
  const { appDispatch } = useContext(AppContext);

  const [imageCrop, setImageCrop] = useState(false);

  const [storageImage, setStorageImage] = useState();

  const saveImage = useCallback(() => {
    setStorageImage(imageCrop);
    appDispatch({ type: 'HANDLE_DIALOG', dialog: 0 });
  }, [appDispatch, imageCrop]);

  const onClose = useCallback(() => {
    setImageCrop(null)
  }, []);

  const onCrop = useCallback((preview) => {
    setImageCrop(preview)
  }, []);

  const modules = useMemo(() => {
    const tempItensMenu = loginState.itens_menu || ["Pessoas", "Dízimo", "Eventos"];
    
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
      style={{padding: theme.spacing(1), maxWidth: '900px', margin: '0 auto' }}
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
            margin: theme.spacing(2), cursor: 'pointer'
          }}
          onClick={() => appDispatch({ type: 'HANDLE_DIALOG', dialog: 1 })}
        >
          {storageImage ? (
            <img alt src={storageImage} />
          ) : (
            <span
              style={{
                display: 'flex', alignItems: 'center', backgroundColor: '#CCC'
              }}
            >Clique aqui para definir sua foto de perfil</span>
          )}
        </figure>
        <p style={{ fontSize: '5vmin', fontWeight: 'bold', marginBottom: theme.spacing(1) }}>Olá, Gabriel</p>
        <span style={{ fontSize: '2.5vmin', fontStyle: 'italic'}}>Que a paz de Nosso Senhor esteja com você!</span>
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

      <MuiDialog 
        title="Escolha sua foto de perfil"
        children={
          <>
            <Avatar 
              width={390}
              height={295}
              onCrop={onCrop}
              onClose={onClose}
              // src={imageCrop.src}
            />
            <Button onClick={saveImage}>Salvar</Button>
          </>
        }
      />
    </div>
  )
}
