import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

const tableRows = [
  'Título',
  'Nome',
  'Idade',
  'Dizimista',
]

export default function MuiTable(props) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableRows.map((row, key) => <TableCell key={key}>{row}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.dizimist}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
