import { createElement, useCallback, useContext, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';

import { LoginContext } from '../../contexts/LoginContext';
import { AppContext } from '../../contexts/AppContext';
import Header from '../../components/Header';
import { Typography } from '@mui/material';
import ButtonToContribue from '../../components/ButtonToContribue';
import { theme } from '../../App';
import { api } from '../../services/api';
import initWebcheckout from '../../services/initWebCheckout';

let checkoutPagseguro;

export default function QueroSerDizimista() {
  const { logout, loginState } = useContext(LoginContext);
  const { appDispatch } = useContext(AppContext);

  const newContributor = useCallback(async() => {
    const response = await api.dizimo.newContributor(loginState.id_pessoa);

    console.log('res: ', response);
  }, []);

  const pagSeguro = useCallback(async () => {
    const response = await api.pagseguro.getCode();

    console.log('res: ', response);
  }, []);

  useState(() => {
    newContributor(loginState.id_pessoa);

    pagSeguro();

    initWebcheckout(() => {
      console.log(window.PagSeguroLightbox);
      checkoutPagseguro = window.PagSeguroLightbox;
    });

  }, []);

  const Container = styled('div')(({ theme }) => ({
    margin: `0 ${theme.spacing(2)}`,
  }));

  return (
    <>
      <Header title="Cadastro para Dizimista" noSearch />
      <Container>
        <Typography fontSize={12} textAlign="center" marginBottom={theme.spacing(2)} fontFamily="Montserrat">Veja como o dízimo é utilizado em nossa paróquia. <a href="#">Informativo Paroquial</a></Typography>
        <ButtonToContribue 
          title="Quero ser Dizimista"
          text="Doe mensalmente no boleto, crédito ou pix e se torne um dizimista."
        />
        <ButtonToContribue 
          title="Doação Espontânea"
          text="Doe um valor espontâneo para ajudar nos custos paroquiais"
        />
      </Container>
    </>
  )
}
