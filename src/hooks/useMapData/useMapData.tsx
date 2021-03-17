import { useQuery, UseQueryResult } from 'react-query';
import IMapData from 'interfaces/map-data';

const getMapData = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/map-data`).then((res) =>
    res.json(),
  );
};

export default function useMapData(): UseQueryResult<IMapData[], Error> {
  return useQuery<IMapData[], Error>(['mapData'], getMapData, {
    refetchOnWindowFocus: false,
  });
}
