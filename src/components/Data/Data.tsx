import React from 'react';
import useData from 'hooks/useData/useData';
import usePollutants, {
  getPollutantById,
} from 'hooks/usePollutants/usePollutants';
import { makeStyles } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  tableContainer: {
    display: 'inline-table',
    width: 'auto',
  },
  table: {
    minWidth: 650,
    maxWidth: 850,
    display: 'inline-table',
  },
});

function Data(props: { latitude: number; longitude: number }): JSX.Element {
  const pollutants = usePollutants().data;
  const { status, data, error, isFetching } = useData(props);

  const classes = useStyles();

  if (status === 'loading' || data === null) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <StylesProvider injectFirst>
      <div>
        {isFetching && <p>Background fetching...</p>}
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Created</TableCell>
                <TableCell align="center">Updated</TableCell>
                <TableCell align="center">Deleted</TableCell>
                <TableCell align="center">Datetime</TableCell>
                <TableCell align="center">Value</TableCell>
                <TableCell align="center">Station ID</TableCell>
                <TableCell align="center">Pollutant ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                  <TableCell align="center">{row.updatedAt}</TableCell>
                  <TableCell align="center">{row.deletedAt}</TableCell>
                  <TableCell align="center">{row.datetime}</TableCell>
                  <TableCell align="center">{row.value}</TableCell>
                  <TableCell align="center">{row.stationId}</TableCell>
                  <TableCell align="center">
                    {getPollutantById(pollutants, row.pollutantId).fullName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </StylesProvider>
  );
}

export default Data;
