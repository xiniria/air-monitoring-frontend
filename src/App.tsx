import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import Home from 'components/Home/Home';
import useGeolocation from 'hooks/useGeolocation/useGeolocation';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import { LocationContext, LocationTypes, equals } from 'LocationContext';
import 'App.css';

function App(): JSX.Element {
  const currentPos = useGeolocation();

  const [location, setLocation] = React.useState({
    latitude: NaN,
    longitude: NaN,
    error: "Aucune addresse n'a été choisie.",
    type: LocationTypes.Geolocation,
  });

  useEffect(() => {
    if (
      location.type == LocationTypes.Geolocation &&
      !equals(location, currentPos)
    ) {
      setLocation(currentPos);
    }
  }, [currentPos]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <Router>
        <AddressAutocomplete />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/location" component={Home}></Route>
            <Route exact path="/map" component={Home}></Route>
            <Route exact path="/predictions" component={Home}></Route>
            <Route exact path="/info" component={Home}></Route>
          </Switch>

          <h3>Latitude : {location.latitude}</h3>
          <h3>Longitude : {location.longitude}</h3>
          {location.error && <p>Erreur : {location.error}</p>}
        </div>

        <Navbar />
      </Router>
    </LocationContext.Provider>
  );
}

export default App;
