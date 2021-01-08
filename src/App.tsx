import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import Home from 'components/Home/Home';
import Geolocation from 'components/Geolocation/Geolocation';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import 'App.css';

function App(): JSX.Element {
  const { latitude, longitude, error } = Geolocation();

  return (
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

        <h3>Latitude : {latitude}</h3>
        <h3>Longitude : {longitude}</h3>
        {error && <h4>Erreur : {error}</h4>}
      </div>

      <Navbar />
    </Router>
  );
}

export default App;
