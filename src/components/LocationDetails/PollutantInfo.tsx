import React from 'react';
import { Link } from 'react-router-dom';
import ICleanEntry from 'interfaces/clean-entry';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { StylesProvider, makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './PollutantInfo.css';

const useStyles = makeStyles({
  root: {
    fontFamily: 'inherit',
    lineHeight: 1,
    fontSize: 'inherit',
  },
});

function PollutantInfo(cleanEntry: ICleanEntry): JSX.Element {
  const classes = useStyles();

  return (
    <StylesProvider>
      <TableRow component="tr">
        <TableCell className={classes.root}>
          <Link
            to={`/pollutant-details/${cleanEntry.pollutantId}`}
            className="link"
          >
            <span className={`level-icon ${cleanEntry.level}`}>
              <FiberManualRecordIcon fontSize="small" />
            </span>
            <span className="short-name">{cleanEntry.shortName}</span>
          </Link>
        </TableCell>
        <TableCell className={classes.root} align="center">
          <Link
            to={`/pollutant-details/${cleanEntry.pollutantId}`}
            className="link"
          >
            {cleanEntry.value} {cleanEntry.unit}
          </Link>
        </TableCell>
        <TableCell className={classes.root} align="right">
          <Link
            to={`/pollutant-details/${cleanEntry.pollutantId}`}
            className="link"
          >
            <ChevronRightIcon />
          </Link>
        </TableCell>
      </TableRow>
    </StylesProvider>
  );
}

export default PollutantInfo;
