import React from 'react';
import ICleanEntry from 'interfaces/clean-entry';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import './WeatherInfo.css';

function PollutantInfo(cleanEntry: ICleanEntry): JSX.Element {
  return (
    <TableRow component="tr">
      <TableCell className="weather" colSpan={2}>
        <div className="weather-icon">{cleanEntry.shortName}</div>
        <span className="weather-name">{cleanEntry.fullName}</span>
      </TableCell>
      <TableCell className="weather">
        <span className="weather-value">
          {cleanEntry.value} {cleanEntry.unit}
        </span>
      </TableCell>
    </TableRow>
  );
}

export default PollutantInfo;
