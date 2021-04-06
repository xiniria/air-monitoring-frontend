import React from 'react';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import GoogleMapComponent from 'components/Map/GoogleMapComponent';

function Map(): JSX.Element {
  return (
    <div>
      <AddressAutocomplete />
      <GoogleMapComponent />
    </div>
  );
}

export default Map;
