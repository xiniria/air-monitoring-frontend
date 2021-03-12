import React, { useContext, useState } from 'react';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import PageTitle from 'components/PageTitle/PageTitle';
import HistoryChart from 'components/HistoryChart/HistoryChart';
import useHistoryData from 'hooks/useHistoryData/useHistoryData';
import usePollutants from 'hooks/usePollutants/usePollutants';
import { LocationContext } from 'LocationContext';
import IPollutant from 'interfaces/pollutant';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StylesProvider } from '@material-ui/core/styles';
import './HistoryAndPrevisions.css';

function HistoryAndPrevisions(): JSX.Element {
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

  // Set the current pollutant that is displayed
  const handleSelect = (chosenPollutant: IPollutant) => () => {
    setCurrentPollutant(chosenPollutant);
  };

  if (status === 'loading' || pollutantsStatus === 'loading') {
    return (
      <div>
        <AddressAutocomplete />
        <PageTitle title="Historique et Prévisions" />
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
        <PageTitle title="Historique et Prévisions" />
        <p>{error?.message || pollutantsError?.message}</p>
      </div>
    );
  }

  return (
    <StylesProvider injectFirst>
      <AddressAutocomplete />
      <PageTitle title="Historique et Prévisions" />

      {pollutants
        ?.filter((pollutant) => pollutant.isPollutant)
        .sort((a, b) => (a.waqiName > b.waqiName ? 1 : -1)) // Order alphabetically
        .map(function (pollutant) {
          return (
            <Fab
              key={pollutant.id}
              id={pollutant.waqiName}
              className={
                'pollutant-btn' +
                (pollutant.waqiName === currentPollutant.waqiName
                  ? ' selected'
                  : '')
              }
              size="medium"
              aria-label={pollutant.waqiName}
              onClick={handleSelect(pollutant)}
              disableRipple
            >
              {pollutant.shortName}
            </Fab>
          );
        })}

      <HistoryChart
        data={data || []}
        pollutants={pollutants || []}
        pollutant={currentPollutant}
      />
    </StylesProvider>
  );
}

export default HistoryAndPrevisions;
