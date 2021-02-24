import React from 'react';
import usePollutants from '../../hooks/usePollutants/usePollutants';
import PollutantItem from './PollutantItem';
import PageTitle from '../PageTitle/PageTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import './PollutantList.css';

function PollutantList(): JSX.Element {
  const { status, data: pollutants, error, isFetching } = usePollutants();

  if (status === 'loading') {
    return (
      <div className="loader">
        <CircularProgress color="inherit" size={50} thickness={3} />
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <PageTitle title="Informations" />
      {isFetching && <p>Background fetching...</p>}
      <ul className="pollutant-list">
        {pollutants &&
          pollutants
            .filter((pollutant) => pollutant.isPollutant)
            .map((pollutant) => (
              <li key={pollutant.id}>
                <PollutantItem {...pollutant}></PollutantItem>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default PollutantList;
