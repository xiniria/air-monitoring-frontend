import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IPollutant from 'interfaces/pollutant';
import './PollutantList.css';

function PollutantItem(pollutant: IPollutant): JSX.Element {
  return (
    <Link to={`/pollutant-details/${pollutant.id}`} className="link">
      <Grid
        container
        spacing={3}
        alignItems="center"
        className="grid-container"
      >
        <Grid item xs={10}>
          <div className="pollutant-item">
            <h3 className="pollutant-item-name">{`${pollutant.fullName} (${pollutant.shortName})`}</h3>
            <p className="pollutant-item-text">{`${pollutant.description.substr(
              0,
              100,
            )}`}</p>
          </div>
        </Grid>
        <Grid item xs={2}>
          <ChevronRightIcon fontSize="large" />
        </Grid>
      </Grid>
    </Link>
  );
}

export default PollutantItem;
