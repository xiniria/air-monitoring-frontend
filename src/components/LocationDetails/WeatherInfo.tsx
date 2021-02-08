import React from 'react';
import ICleanEntry from 'interfaces/clean-entry';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { StylesProvider, makeStyles } from '@material-ui/core/styles';
import './WeatherInfo.css';

const useStyles = makeStyles({
  root: {
    margin: '0',
    padding: '0',
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '0.75rem',
    border: 'none',
  },
});

function PollutantInfo(cleanEntry: ICleanEntry): JSX.Element {
  const classes = useStyles();

  return (
    <StylesProvider>
      <TableRow component="tr">
        <TableCell className={classes.root} align="left" colSpan={2}>
          <div className="weather-icon">{cleanEntry.shortName}</div>
          <span className="weather-name">{cleanEntry.fullName}</span>
        </TableCell>
        <TableCell className={classes.root} align="right">
          <span className="weather-value">
            {cleanEntry.value} {cleanEntry.unit}
          </span>
        </TableCell>
      </TableRow>
    </StylesProvider>
  );
}

export default PollutantInfo;
