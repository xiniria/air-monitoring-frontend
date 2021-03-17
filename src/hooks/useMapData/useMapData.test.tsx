import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useMapData from 'hooks/useMapData/useMapData';
import { QueryClient, QueryClientProvider } from 'react-query';
import nock from 'nock';

interface IProps {
  children: React.ReactNode;
}

process.env.REACT_APP_API_URL = 'http://localhost:5000';

const queryClient = new QueryClient();
const wrapper = ({ children }: IProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.setTimeout(15000);
describe('use Map data', () => {
  const response = [
    {
      id: 1,
      createdAt: '2020-12-05T19:00:23.592Z',
      updatedAt: '2020-12-05T19:00:23.592Z',
      deletedAt: 'null',
      name: 'Paris Stade Lenglen, Paris',
      latitude: 48.8303,
      longitude: 2.26972,
      externalId: 6937,
      data: [
        {
          id: 78915,
          createdAt: '2021-01-13T10:05:04.944Z',
          updatedAt: '2021-01-13T10:05:04.944Z',
          deletedAt: 'null',
          datetime: '2021-01-13T07:00:00.000Z',
          value: 0.1,
          stationId: 1,
          pollutantId: 1,
        },
      ],
    },
  ];

  const { result, waitFor } = renderHook(() => useMapData(), { wrapper });

  test('Returns map data (most recent pollutant data for all stations) successfully', async () => {
    nock('http://localhost:5000')
      .persist()
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
      })
      .get(`/map-data`)
      .reply(200, response);

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toStrictEqual(response);
  });
});
