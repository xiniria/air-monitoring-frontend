import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from 'components/Home/Home';
import Navbar from 'components/Navbar/Navbar';
import PollutantDetails from './components/PollutantDetails/PollutantDetails';
import PollutantList from 'components/PollutantList/PollutantList';
import useGeolocation from 'hooks/useGeolocation/useGeolocation';
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
      location.type === LocationTypes.Geolocation &&
      !equals(location, currentPos)
    ) {
      setLocation(currentPos);
    }
  }, [currentPos]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/location" component={Home}></Route>
              <Route exact path="/map" component={Home}></Route>
              <Route exact path="/predictions" component={Home}></Route>
              <Route exact path="/info" component={PollutantList}></Route>
              <Route
                exact
                path="/pollutant-details/:pollutantId"
                component={PollutantDetails}
              ></Route>
            </Switch>
          </div>
          {process.env.REACT_APP_RENDER_REACT_QUERY_DEVTOOLS === 'true' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>

        {/* We set the path as key to force re-render on route change */}
        <Navbar key={window.location.pathname} />
      </Router>
    </LocationContext.Provider>
  );
}

export default App;
