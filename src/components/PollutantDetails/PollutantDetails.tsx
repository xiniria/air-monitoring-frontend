import React from 'react';
import { useParams } from 'react-router-dom';
import usePollutants, {
  getPollutantById,
} from '../../hooks/usePollutants/usePollutants';
import PageTitle from '../PageTitle/PageTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import './PollutantDetails.css';

function PollutantDetails(): JSX.Element {
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
