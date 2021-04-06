import React, { useContext, useState } from 'react';
import PollutantButtons from 'components/PollutantButtons/PollutantButtons';
import HistoryChart from 'components/HistoryChart/HistoryChart';
import useHistoryData from 'hooks/useHistoryData/useHistoryData';
import usePollutants from 'hooks/usePollutants/usePollutants';
import { LocationContext } from 'LocationContext';
import IPollutant from 'interfaces/pollutant';
import CircularProgress from '@material-ui/core/CircularProgress';

function ChartAndButtons(): JSX.Element {
  const { location } = useContext(LocationContext);
  const props = { latitude: location.latitude, longitude: location.longitude };

  const { status, data, error } = useHistoryData(props);
  const {
    status: pollutantsStatus,
    data: pollutants,
    error: pollutantsError,
  } = usePollutants();

  const [currentPollutant, setCurrentPollutant] = useState({
    waqiName: 'aqi', // Default pollutant to display
  } as IPollutant);

  if (status === 'loading' || pollutantsStatus === 'loading') {
    return (
      <div className="loader">
        <CircularProgress color="inherit" size={50} thickness={3} />
      </div>
    );
  }

  if (error || pollutantsError) {
    return <p>{error?.message || pollutantsError?.message}</p>;
  }

  return (
    <div>
      <PollutantButtons
        pollutants={pollutants || []}
        currentPollutant={currentPollutant}
        setCurrentPollutant={setCurrentPollutant}
      />
      <HistoryChart
        data={data || []}
        pollutants={pollutants || []}
        pollutant={currentPollutant}
      />
    </div>
  );
}

export default ChartAndButtons;
