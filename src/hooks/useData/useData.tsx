import { QueryObserverResult, useQuery } from 'react-query';
import IPollutantData from 'interfaces/pollutant-data';

const getData = (props: { latitude: number; longitude: number }) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/pollutant-data/${props.latitude}/${props.longitude}`,
  ).then((res) => res.json());
};

export default function useData(props: {
  latitude: number;
  longitude: number;
}): QueryObserverResult<IPollutantData[], Error> {
  return useQuery<IPollutantData[], Error>(
    ['pollutantData', props.latitude, props.longitude],
    () => getData(props),
    { refetchOnWindowFocus: false },
  );
}
