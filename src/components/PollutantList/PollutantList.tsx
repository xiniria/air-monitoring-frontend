import React from 'react';
import { Grid } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PollutantItem from './PollutantItem';
import { IPollutant } from 'interfaces/pollutant';
import './PollutantList.css';
import { useHistory } from 'react-router-dom';

const pollutants: IPollutant[] = [
  {
    id: 1,
    shortName: 'AQI',
    fullName: "Indice de qualité de l'air",
    description: "Indice donnant le niveau global de qualité de l'air.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: 2,
    shortName: 'CO',
    fullName: 'Monoxyde de carbone',
    description: 'Gaz incolore, inodore et potentiellement mortel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  },
];

function PollutantList(): JSX.Element {
  const history = useHistory();

  return (
    <div>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={1}>
          <ChevronLeftIcon fontSize="large" onClick={() => history.goBack()} />
        </Grid>
        <Grid item xs={10} className="pollutant-info-title">
          <h1>Informations</h1>
        </Grid>
      </Grid>
      <ul className="pollutant-list">
        {pollutants.map((pollutant) => (
          <li key={pollutant.id}>
            <PollutantItem {...pollutant}></PollutantItem>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollutantList;
