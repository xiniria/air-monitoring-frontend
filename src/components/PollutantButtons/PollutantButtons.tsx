import React from 'react';
import IPollutant from 'interfaces/pollutant';
import Fab from '@material-ui/core/Fab';
import './PollutantButtons.css';

function PollutantButtons(props: {
  pollutants: IPollutant[];
  currentPollutant: IPollutant;
  setCurrentPollutant: React.Dispatch<React.SetStateAction<IPollutant>>;
}): JSX.Element {
  // Set the current pollutant that is displayed
  const handleSelect = (chosenPollutant: IPollutant) => () => {
    props.setCurrentPollutant(chosenPollutant);
  };

  return (
    <>
      {props.pollutants
        ?.filter((pollutant) => pollutant.isPollutant)
        .sort((a, b) => (a.waqiName > b.waqiName ? 1 : -1)) // Order alphabetically
        .map(function (pollutant) {
          return (
            <Fab
              key={pollutant.id}
              id={pollutant.waqiName}
              className={
                'pollutant-btn' +
                (pollutant.waqiName === props.currentPollutant.waqiName
                  ? ' selected'
                  : '')
              }
              size="medium"
              aria-label={pollutant.waqiName}
              onClick={handleSelect(pollutant)}
              disableRipple
            >
              {pollutant.shortName}
            </Fab>
          );
        })}
    </>
  );
}

export default PollutantButtons;
