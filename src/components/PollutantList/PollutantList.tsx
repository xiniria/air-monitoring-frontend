import React from 'react';
import usePollutants from '../../hooks/usePollutants/usePollutants';
import PollutantItem from './PollutantItem';
import PageTitle from '../PageTitle/PageTitle';
import './PollutantList.css';

function PollutantList(): JSX.Element {
  const { status, data: pollutants, error, isFetching } = usePollutants();

  if (status === 'loading') {
    return <p>Loading...</p>;
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
