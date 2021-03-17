import React from 'react';
import { Link } from 'react-router-dom';
import IPollutant from 'interfaces/pollutant';
import { maxLevels } from 'levels';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './HistoryValueDetails.css';

function HistoryValueDetails(props: {
  pollutant: IPollutant;
  value: number;
  level: string;
}): JSX.Element {
  if (props.pollutant === undefined) {
    return <></>;
  }

  const maxLevel = maxLevels[props.pollutant.waqiName];
  //Function to get the position of the circle on the gauge
  const computeGaugeLevel = (): string => {
    const gaugeHeight = 200;
    const circleRadius = 12;
    return (
      Math.max(
        gaugeHeight - (props.value * gaugeHeight) / maxLevel - circleRadius,
        0,
      ) + 'px'
    );
  };

  return (
    <Grid container alignContent="end" justifyContent="center">
      <Grid item xs={2} md={2} lg={1} mb={2}>
        <div className="gauge">
          <div className="gauge-circle" style={{ top: computeGaugeLevel() }}>
            <div className="inner-circle"></div>
          </div>
        </div>
      </Grid>
      <Grid item xs={10} md={6} lg={3} mb={2}>
        <Grid container className="pollutant-details" alignItems="baseline">
          <Grid item xs={6} textAlign="left">
            <div>
              <span className="pollutant-details">
                <span
                  className="pollutant-value"
                  style={{ color: props.level }}
                >
                  {props.value}
                </span>
              </span>
              {props.pollutant.unit}
            </div>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <div>
              <Link
                to={`/pollutant-details/${props.pollutant.id}`}
                className="link"
              >
                <span className="more-details">Plus de détails</span>
                <ChevronRightIcon className="chevron-icon" />
              </Link>
            </div>
          </Grid>
        </Grid>
        <p className="pollutant-description">
          {props.pollutant.description.length > 250
            ? props.pollutant.description.substr(0, 250) + '...'
            : props.pollutant.description}
        </p>
      </Grid>
    </Grid>
  );
}

export default HistoryValueDetails;
