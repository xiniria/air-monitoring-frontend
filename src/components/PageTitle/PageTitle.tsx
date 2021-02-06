import React from 'react';
import { Grid } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useHistory } from 'react-router-dom';
import './PageTitle.css';

export default function PageTitle(props: { title: string }): JSX.Element {
  const history = useHistory();

  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={1}>
        <ChevronLeftIcon fontSize="large" onClick={() => history.goBack()} />
      </Grid>
      <Grid item xs={10} className="page-title">
        <h1>{props.title}</h1>
      </Grid>
    </Grid>
  );
}
