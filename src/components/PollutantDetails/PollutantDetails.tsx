import React from 'react';
import { useParams } from 'react-router-dom';
import usePollutants, {
  getPollutantById,
} from '../../hooks/usePollutants/usePollutants';
import PageTitle from '../PageTitle/PageTitle';
import './PollutantDetails.css';

function PollutantDetails(): JSX.Element {
  const { status, data: pollutants, error, isFetching } = usePollutants();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  const { pollutantId } = useParams<{ pollutantId: string }>();
  const pollutant = getPollutantById(pollutants, parseInt(pollutantId, 10));
  const description = pollutant.description
    .split('\n\n')
    .map((paragraph, index) => (
      <p key={index} className="pollutant-description">
        {paragraph}
      </p>
    ));

  return (
    <div>
      <PageTitle title={`${pollutant.fullName} (${pollutant.shortName})`} />
      {isFetching && <p>Background fetching...</p>}
      {description}
    </div>
  );
}

export default PollutantDetails;
