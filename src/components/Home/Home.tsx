import React, { useContext } from 'react';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import Data from 'components/Data/Data';
import { LocationContext } from 'LocationContext';

function Home(): JSX.Element {
  const { location } = useContext(LocationContext);

  return (
    <div>
      <AddressAutocomplete />
      <h3>Latitude : {location.latitude}</h3>
      <h3>Longitude : {location.longitude}</h3>
      {location.error && <p>Erreur : {location.error}</p>}

      <Data latitude={location.latitude} longitude={location.longitude} />
    </div>
  );
}

export default Home;
