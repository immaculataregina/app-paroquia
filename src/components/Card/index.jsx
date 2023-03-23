import { styled } from '@mui/material/styles';

export default function Card(props) {

  const Container = styled('div')(({ theme }) => ({
    borderRadius: 4,
    marginBottom: theme.spacing(2),
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  }));

  const CardHeader = styled('header')(({ theme }) => ({
    height: theme.spacing(1),
    backgroundColor: '#F2F2F2',
    width: '100%'
  }));

  const CardContainer = styled('main')(({ theme }) => ({
    padding: theme.spacing(2)
  }));

  const CardTitle = styled('h1')(({ theme }) => ({
    fontSize: '1.5em',
    marginBottom: theme.spacing(2)
  }));

  const CardContent = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(1)
  }));

  const CardContentValue = styled('div')(({ theme }) => ({
    '& span': {
      fontFamily: 'Montserrat-Bold'
    }
  }));

  return (
    <Container>
      <CardHeader />
      <CardContainer>
        <CardTitle>Título Principal</CardTitle>
        <CardContent>
          {props.contents.map((content, key) => (
            <CardContentValue key={key}>
              <span>{content.key}:</span> {content.value}
            </CardContentValue>
          ))}
        </CardContent>
      </CardContainer>
    </Container>
  )
}
