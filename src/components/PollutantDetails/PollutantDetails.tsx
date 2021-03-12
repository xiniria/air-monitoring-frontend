import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import PageTitle from '../PageTitle/PageTitle';
import HistoryChart from 'components/HistoryChart/HistoryChart';
import usePollutants, {
  getPollutantById,
} from '../../hooks/usePollutants/usePollutants';
import useHistoryData from 'hooks/useHistoryData/useHistoryData';
import { LocationContext } from 'LocationContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import './PollutantDetails.css';

function PollutantDetails(): JSX.Element {
  const { location } = useContext(LocationContext);
  const props = { latitude: location.latitude, longitude: location.longitude };

  const {
    status: pollutantsStatus,
    data: pollutants,
    error: pollutantsError,
  } = usePollutants();
  const { status, data, error } = useHistoryData(props);

  if (status === 'loading' || pollutantsStatus === 'loading') {
    return (
      <div>
        <AddressAutocomplete />
        <PageTitle title="..." />
        <div className="loader">
          <CircularProgress color="inherit" size={50} thickness={3} />
        </div>
      </div>
    );
  }

  if (error || pollutantsError) {
    return (
      <div>
        <AddressAutocomplete />
        <PageTitle title="..." />
        <p>{error?.message || pollutantsError?.message}</p>
      </div>
    );
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
      <AddressAutocomplete />
      <PageTitle title={`${pollutant.fullName} (${pollutant.shortName})`} />
      {description}
      <HistoryChart
        data={data || []}
        pollutants={pollutants || []}
        pollutant={pollutant}
      />
    </div>
  );
}

export default PollutantDetails;
