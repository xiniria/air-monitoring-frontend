import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import Home from 'components/Home/Home';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import 'App.css';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/location" component={Home}></Route>
          <Route exact path="/map" component={Home}></Route>
          <Route exact path="/predictions" component={Home}></Route>
          <Route exact path="/info" component={Home}></Route>
        </Switch>
        <div className="container">
          <AddressAutocomplete></AddressAutocomplete>
        </div>
        <Navbar></Navbar>
      </div>
    </Router>
  );
}

export default App;
