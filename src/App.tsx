import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Navbar from 'components/Navbar/Navbar';
import Home from 'components/Home/Home';
import useGeolocation from 'hooks/useGeolocation/useGeolocation';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import Data from 'components/Data/Data';
import { LocationContext, equals } from 'LocationContext';
import { LocationTypes } from 'interfaces/location';
import 'App.css';

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
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
            <Data latitude={location.latitude} longitude={location.longitude} />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Navbar />
      </Router>
    </LocationContext.Provider>
  );
}

export default App;
