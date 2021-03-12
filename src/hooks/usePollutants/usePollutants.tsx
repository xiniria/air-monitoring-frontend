import { useQuery, UseQueryResult } from 'react-query';
import IPollutant from 'interfaces/pollutant';

const getPollutants = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/pollutants`).then((res) =>
    res.json(),
  );
};

export default function usePollutants(): UseQueryResult<IPollutant[], Error> {
  return useQuery<IPollutant[], Error>(['pollutants'], getPollutants, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export function getPollutantById(
  data: IPollutant[] | undefined,
  pollutantId: number,
): IPollutant {
  for (const pollutant of data || []) {
    if (pollutant.id === pollutantId) {
      return pollutant;
    }
  }
  return {} as IPollutant;
}

export function getPollutantByWaqiName(
  data: IPollutant[] | undefined,
  pollutantWaqiName: string,
): IPollutant {
  for (const pollutant of data || []) {
    if (pollutant.waqiName === pollutantWaqiName) {
      return pollutant;
    }
  }
  return {} as IPollutant;
}
