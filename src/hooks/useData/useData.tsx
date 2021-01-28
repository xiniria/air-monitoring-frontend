import { QueryObserverResult, useQuery } from 'react-query';
import IPollutantData from 'interfaces/pollutant-data';

const getData = async (props: {
  latitude: number;
  longitude: number;
}): Promise<IPollutantData[] | null> => {
  if (Number.isNaN(props.latitude) || Number.isNaN(props.longitude)) {
    return Promise.resolve(null);
  }
  return fetch(
    `${process.env.REACT_APP_API_URL}/pollutant-data/${props.latitude}/${props.longitude}`,
  ).then((res) => res.json());
};

export default function useData(props: {
  latitude: number;
  longitude: number;
}): QueryObserverResult<IPollutantData[] | null, Error> {
  return useQuery<IPollutantData[] | null, Error>(
    ['pollutantData', props.latitude, props.longitude],
    () => getData(props),
    { refetchOnWindowFocus: false },
  );
}
