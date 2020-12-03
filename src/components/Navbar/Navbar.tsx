import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import './Navbar.css';

const useStyles = makeStyles({
  root: {
    '&$selected': {
      color: 'mediumseagreen',
    },
  },
  selected: {},
});

function Navbar(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className="stickToBottom"
    >
      <BottomNavigationAction
        component={Link}
        to="/location"
        classes={classes}
        label="Location"
        value="location"
        icon={<LocationOnOutlinedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/map"
        classes={classes}
        label="Carte"
        value="map"
        icon={<MapOutlinedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/predictions"
        classes={classes}
        label="Prédictions"
        value="predictions"
        icon={<BarChartOutlinedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/info"
        classes={classes}
        label="Informations"
        value="info"
        icon={<InfoOutlinedIcon />}
      />
    </BottomNavigation>
  );
}

export default Navbar;
