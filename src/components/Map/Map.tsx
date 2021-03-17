import React, { useContext, useState } from 'react';
import { GoogleMap, InfoBox } from '@react-google-maps/api';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import PollutantButtons from 'components/PollutantButtons/PollutantButtons';
import useMapData from 'hooks/useMapData/useMapData';
import usePollutants from 'hooks/usePollutants/usePollutants';
import { LocationContext } from 'LocationContext';
import IPollutant from 'interfaces/pollutant';
import { levels } from 'levels';
import { StylesProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Map.css';

function Map(): JSX.Element {
  const { location } = useContext(LocationContext);
  const [currentPollutant, setCurrentPollutant] = useState({
    id: 13,
    waqiName: 'aqi', // Default pollutant to display
  } as IPollutant);
  const { status, data, error } = useMapData();
  const mapStyles = {
    height: '86vh',
    width: '100%',
  };

  const {
    status: pollutantsStatus,
    data: pollutants,
    error: pollutantsError,
  } = usePollutants();
  const defaultCenter =
    isNaN(location.latitude) || isNaN(location.longitude)
      ? {
          lat: 48.856614, //Paris latitude by default
          lng: 2.3522219, //Paris longitude by default
        }
      : { lat: location.latitude, lng: location.longitude };

  if (status === 'loading' || pollutantsStatus === 'loading') {
    return (
      <div>
        <AddressAutocomplete />
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
        <p>{error?.message || pollutantsError?.message}</p>
      </div>
    );
  }

  const locations = [];

  for (const station of data || []) {
    const pollutantName = currentPollutant.waqiName;

    const stationInfoBox = {
      id: station.id,
      name: pollutantName,
      value: 0,
      level: '',
      location: {
        lat: station.latitude,
        lng: station.longitude,
      },
    };

    for (const entry of station.data) {
      if (entry.pollutantId === currentPollutant.id) {
        const value = entry.value;
        stationInfoBox.value = value;
        const level = levels[pollutantName];
        if (value <= level[0]) {
          stationInfoBox.level = 'good';
        } else if (value > level[1]) {
          stationInfoBox.level = 'bad';
        } else {
          stationInfoBox.level = 'average';
        }
      }
    }

    locations.push(stationInfoBox);
  }

  return (
    <StylesProvider injectFirst>
      <AddressAutocomplete />
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        <div className="buttons-container">
          <PollutantButtons
            pollutants={pollutants || []}
            currentPollutant={currentPollutant}
            setCurrentPollutant={setCurrentPollutant}
          />
        </div>

        {locations.map((item) => {
          return (
            <InfoBox key={item.id} position={item.location}>
              <div className={`info-container ${item.level}`}>
                <span className="station-level">{item.value}</span>
              </div>
            </InfoBox>
          );
        })}
      </GoogleMap>
    </StylesProvider>
  );
}

export default Map;
