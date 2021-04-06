import React, { useContext } from 'react';
import PollutantInfo from './PollutantInfo';
import LocationCard from 'components/LocationCard/LocationCard';
import AddressAutocomplete from 'components/AddressAutocomplete/AddressAutocomplete';
import PageTitle from '../PageTitle/PageTitle';
import useData from 'hooks/useData/useData';
import usePollutants, {
  getPollutantById,
} from 'hooks/usePollutants/usePollutants';
import IPollutant from 'interfaces/pollutant';
import IPollutantData from 'interfaces/pollutant-data';
import ICleanEntry from 'interfaces/clean-entry';
import { levels } from 'levels';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LocationContext } from 'LocationContext';
import './LocationDetails.css';

function LocationDetails(): JSX.Element {
  const { location } = useContext(LocationContext);
  const props = { latitude: location.latitude, longitude: location.longitude };

  const pollutants = usePollutants().data;
  const { status, data, error } = useData(props);

  const cleanData = analyzeData(data || [], pollutants || []);

  if (!cleanData.aqi) {
    let aqiId: number;
    if (!pollutants) aqiId = 0;
    else {
      const aqi = pollutants.find((pollutant) => pollutant.shortName === 'aqi');
      aqiId = aqi ? aqi.id : 0;
    }

    cleanData.aqi = {
      id: 0,
      pollutantId: aqiId,
      shortName: 'aqi',
      fullName: `Indice de qualité de l'air`,
      updatedAt: new Date().toLocaleDateString('fr', options),
      level: 'unknown',
      isPollutant: true,
      unit: '',
      value: 0,
    };
  }

  if (status === 'loading' || data === null) {
    return (
      <div>
        <AddressAutocomplete />
        <div className="loader">
          <CircularProgress color="inherit" size={50} thickness={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AddressAutocomplete />
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <AddressAutocomplete />
      <PageTitle title="Qualité de l'air" />
      <LocationCard {...cleanData} />
      <Table aria-label="Details Table">
        <TableHead>
          <TableRow>
            <TableCell className="table-details" colSpan={2}>
              Détails
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(cleanData)
            .filter((entry) => entry.isPollutant)
            .map((entry) => (
              <PollutantInfo key={entry.id} {...entry} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

//Date format
export const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export const analyzeData = (
  data: IPollutantData[],
  pollutants: IPollutant[],
): { [waqiName: string]: ICleanEntry } => {
  const cleanData: { [waqiName: string]: ICleanEntry } = {};

  for (const entry of data) {
    const pollutant = getPollutantById(pollutants, entry.pollutantId);
    const waqiName = pollutant.waqiName;
    const value = entry.value;

    const cleanEntry = {
      id: entry.id,
      updatedAt: new Date(entry.updatedAt).toLocaleDateString('fr', options),
      pollutantId: pollutant.id,
      fullName: pollutant.fullName,
      shortName: pollutant.shortName,
      value: value,
      isPollutant: pollutant.isPollutant,
      unit: pollutant.unit,
      level: '',
    };

    if (waqiName in levels) {
      const level = levels[waqiName];
      if (value <= level[0]) {
        cleanEntry.level = 'good';
      } else if (value > level[1]) {
        cleanEntry.level = 'bad';
      } else if (value > level[0] && value <= level[1]) {
        cleanEntry.level = 'average';
      } else {
        // this shouldn't happen, debugging case
        cleanEntry.level = 'unknown';
      }
    }
    cleanData[waqiName] = cleanEntry;
  }

  return cleanData;
};

export default LocationDetails;
