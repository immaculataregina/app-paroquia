import React, { memo, useMemo, useCallback, useState, useEffect, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';

import { RouteWithSubRoutes } from '../../routes';
import useRouter from '../../services/hooks/useRouter';
import { Button, IconButton, Typography } from '@mui/material';
import { theme } from '../../App';
import { ArrowBack } from '@mui/icons-material';
import { RegisterContext } from '../../contexts/RegisterContext';
import { AppContext } from '../../contexts/AppContext';
import { CPF, Name, Surname, Birthday, CivilState, Sex } from './Fields/Data';
import { Phone, Email } from './Fields/Contact';
import Password from './Fields/Password';
import Address from './Fields/Address';
import MuiSnackbar from '../../components/MuiSnackbar';

function Register () {
  const router = useRouter();
  const { match, history } = router;
  const { appState, appDispatch } = useContext(AppContext);
  const { registerState, verifyCpf, signUpUser } = useContext(RegisterContext);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');

  const uri = history.location.pathname;

  useEffect(() => {
    appDispatch({ type: 'HANDLE_ALERT', alert: 0 });
  }, []);

  const steps = useMemo(() => ([
    { path: `${match.path}/cpf`, component: CPF, verificaCpf: true },
    { path: `${match.path}/nome`, component: Name },
    { path: `${match.path}/apelido`, component: Surname },
    { path: `${match.path}/data-nascimento`, component: Birthday },
    { path: `${match.path}/estado-civil`, component: CivilState },
    { path: `${match.path}/sexo`, component: Sex },
    { path: `${match.path}/celular`, component: Phone },
    { path: `${match.path}/email`, component: Email },
    { path: `${match.path}/senha`, component: Password },
    { path: `${match.path}/endereco`, component: Address, cadastro: true },
  ]), [match.path]);

  const currentStep = useCallback(() => {
    if (steps.length) {
      let activedStep = steps.filter((step, index) => {
        if (step.path === uri) {
          step.position = index;
          return step
        }
      })[0];

      if (activedStep && Object.keys(activedStep).length) 
        return activedStep;
      else 
        return { position: 0, component: <Redirect to={steps[0].path} push/> }
    }

    return;
  }, [uri, steps]);

  const [currentPositionStep, setCurrentPositionStep] = useState(0);

  const goToNextStep = async () => {
    let validCpf = false;
    if (currentPositionStep === steps.length -1) {
      const res = await signUpUser(registerState.dados.cpf);
      if (res.error) {
        console.error(res.error);
        setAlertType('error');
        setAlertMessage("Ocorreu um erro com o servidor. Tente novamente mais tarde!");
        appDispatch({ type: 'HANDLE_ALERT', alert: 1 });
      } else {
        appDispatch({ type: 'HANDLE_ALERT', alert: 0 });
        history.push("/?cadastro");
      }
      return;
    };

    if (steps[currentPositionStep].verificaCpf) {
      validCpf = await verifyCpf(registerState.dados.cpf);

      if(!validCpf)
        return;
    }
    
    const stepPosition = (currentPositionStep + 1);

    const nextStepUrl = steps[stepPosition].path;
    setCurrentPositionStep(stepPosition);
    history.push(nextStepUrl);
  };

  const goToPreviousStep = () => {
    if (currentPositionStep < 0) return;
    const stepPosition = (currentPositionStep - 1);
    setCurrentPositionStep(stepPosition);
    history.goBack();
  };

  useEffect(() => {
    setCurrentPositionStep(currentStep().position);
  }, [currentStep]);

  return (
    <>
      <AppBar position="static" style={{ padding: `${theme.spacing(4)} ${theme.spacing(2)}`, display: 'grid', alignItems: 'center', gridTemplateColumns: '0.5fr 2fr 0.5fr' }}>
          <IconButton onClick={goToPreviousStep}>
            <ArrowBack style={{ color: '#FFF' }}/>
          </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center">
          Novo Cadastro
        </Typography>
      </AppBar>
      <div
        style={{ 
          display: 'flex', flex: '1', flexDirection: 'column', flexWrap: 'wrap',
          justifyContent: 'center', alignItems: 'center',
          position: 'relative', margin: '0 auto', padding: '32px', maxWidth: '600px',
          fontSize: '1rem', textAlign: 'center'
        }}
      >
        <Switch>
          {currentStep().path && (
            <Route path={currentStep().path} exact>
              {steps.map((step) => <RouteWithSubRoutes {...step} />)}
              <Button
                disabled={registerState.stepValid !== true || appState.loading}
                size="large"
                variant="contained"
                color="primary"
                onClick={() => goToNextStep()}
                style={{ width: '100%', marginTop: theme.spacing(4) }}
              >
                Continuar
              </Button>
            </Route>
          )}
        </Switch>
        <MuiSnackbar message={alertMessage} type={alertType} />
      </div>
    </>
  );
}

export default memo(Register);