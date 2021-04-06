import React, { useContext } from 'react';
import LocationCard from 'components/LocationCard/LocationCard';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import GoogleMapComponent from 'components/Map/GoogleMapComponent';
import ChartAndButtons from 'components/HistoryAndPrevisions/ChartAndButtons';
import useData from 'hooks/useData/useData';
import usePollutants from 'hooks/usePollutants/usePollutants';
import {
  options,
  analyzeData,
} from 'components/LocationDetails/LocationDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { LocationContext } from 'LocationContext';
import './Home.css';

function Home(): JSX.Element {
  const { location } = useContext(LocationContext);
  const props = { latitude: location.latitude, longitude: location.longitude };

  const pollutants = usePollutants().data;
  const { status, data, error } = useData(props);

  const cleanData = analyzeData(data || [], pollutants || []);

  if (!cleanData.aqi) {
    let aqiId: number;
    if (!pollutants) aqiId = 0;
    else {
      const aqi = pollutants.find((pollutant) => pollutant.shortName === 'aqi');
      aqiId = aqi ? aqi.id : 0;
    }

    cleanData.aqi = {
      id: 0,
      pollutantId: aqiId,
      shortName: 'aqi',
      fullName: `Indice de qualité de l'air`,
      updatedAt: new Date().toLocaleDateString('fr', options),
      level: 'unknown',
      isPollutant: true,
      unit: '',
      value: 0,
    };
  }

  if (error || location.error) {
    return (
      <div className="home-container">
        <AddressAutocomplete />
        <p>{error?.message}</p>
        {location?.error && (
          <Alert className="alert" severity="warning">
            {location.error}
          </Alert>
        )}
      </div>
    );
  }

  if (status === 'loading' || data === null) {
    return (
      <div className="home-container">
        <AddressAutocomplete />
        <div className="loader">
          <CircularProgress color="inherit" size={50} thickness={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <AddressAutocomplete />
      <LocationCard {...cleanData} />
      <div className="home-map">
        <GoogleMapComponent />
      </div>
      <div className="home-chart">
        <ChartAndButtons />
      </div>
    </div>
  );
}

export default Home;
