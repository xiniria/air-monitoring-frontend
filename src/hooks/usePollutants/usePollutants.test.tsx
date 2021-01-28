import { renderHook } from '@testing-library/react-hooks';
import usePollutants, {
  getPollutantById,
} from 'hooks/usePollutants/usePollutants';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import nock from 'nock';

interface IProps {
  children: React.ReactNode;
}

process.env.REACT_APP_API_URL = 'http://localhost:5000';

const queryClient = new QueryClient();
const wrapper = ({ children }: IProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Fetch pollutants and find pollutant by ID', () => {
  const response = [
    {
      id: 1,
      createdAt: '2020-12-05T19:00:16.947Z',
      updatedAt: '2020-12-05T19:00:16.947Z',
      deletedAt: null,
      fullName: 'Monoxyde de carbone',
      shortName: 'CO',
      description: '',
      waqiName: 'co',
    },
    {
      id: 2,
      createdAt: '2020-12-05T19:00:16.947Z',
      updatedAt: '2020-12-05T19:00:16.947Z',
      deletedAt: null,
      fullName: 'Humidité',
      shortName: 'H',
      description: '',
      waqiName: 'h',
    },
    {
      id: 3,
      createdAt: '2020-12-05T19:00:16.947Z',
      updatedAt: '2020-12-05T19:00:16.947Z',
      deletedAt: null,
      fullName: "Dioxyde d'azote",
      shortName: 'NO2',
      description: '',
      waqiName: 'no2',
    },
  ];

  nock('http://localhost:5000')
    .persist()
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get(`/pollutants`)
    .reply(200, response);

  const { result, waitFor } = renderHook(() => usePollutants(), { wrapper });

  test('Returns pollutant lists successfully', async () => {
    await waitFor(() => result.current.status == 'success');
    expect(result.current.data).toStrictEqual(response);
  });

  test('Returns correct pollutant when given an ID', async () => {
    await waitFor(() => result.current.status == 'success');

    const pollutant = getPollutantById(result.current.data, 2);

    expect(pollutant).toStrictEqual(response[1]);
  });
});
