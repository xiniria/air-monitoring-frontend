import React from 'react';
import WeatherInfo from './WeatherInfo';
import ICleanEntry from 'interfaces/clean-entry';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import UpdateIcon from '@material-ui/icons/Update';
import './LocationCard.css';

function LocationCard(cleanData: {
  [waqiName: string]: ICleanEntry;
}): JSX.Element {
  return (
    <Box className="card-container" height={170} mb={3}>
      <div className="center">
        <div className={`card ${cleanData['aqi'].level}`}>
          <div className="general">
            <span className="aqi">
              AQI
              <span className="aqi-value">{cleanData['aqi'].value}</span>
            </span>
            <span className="more">Appuyez pour plus d&apos;informations</span>
          </div>
          <div className="additional">
            <div className="smiley-card">
              <div className="level center">{cleanData['aqi'].level}</div>
              {cleanData['aqi'].level === 'good' && (
                <SentimentVerySatisfiedRoundedIcon className="smiley center" />
              )}
              {cleanData['aqi'].level === 'average' && (
                <SentimentSatisfiedRoundedIcon className="smiley center" />
              )}
              {cleanData['aqi'].level === 'bad' && (
                <SentimentVeryDissatisfiedRoundedIcon className="smiley center" />
              )}
              {cleanData['aqi'].level === 'unknown' && (
                <SentimentDissatisfiedRoundedIcon className="smiley center" />
              )}
            </div>
            <div className="more-info">
              <div className="updated-at">
                <div>
                  <UpdateIcon fontSize="large" />
                </div>
                <div className="update-time">
                  <span className="title">Mis à jour le</span>
                  <span className="time">{cleanData['aqi'].updatedAt}</span>
                </div>
              </div>
              <Table aria-label="Details Table" size="small">
                <TableBody>
                  {Object.values(cleanData)
                    .filter(
                      (entry) =>
                        !entry.isPollutant && entry.fullName !== 'Inconnu',
                    )
                    .map((entry) => (
                      <WeatherInfo key={entry.id} {...entry} />
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default LocationCard;
