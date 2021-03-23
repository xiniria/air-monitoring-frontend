import React from 'react';
import { Link } from 'react-router-dom';
import ICleanEntry from 'interfaces/clean-entry';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './PollutantInfo.css';

function PollutantInfo(cleanEntry: ICleanEntry): JSX.Element {
  return (
    <TableRow component="tr">
      <TableCell>
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
      <TableCell align="center">
        <Link
          to={`/pollutant-details/${cleanEntry.pollutantId}`}
          className="link"
        >
          {cleanEntry.value} {cleanEntry.unit}
        </Link>
      </TableCell>
      <TableCell align="right">
        <Link
          to={`/pollutant-details/${cleanEntry.pollutantId}`}
          className="link"
        >
          <ChevronRightIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
}

export default PollutantInfo;
