import { renderHook } from '@testing-library/react-hooks';
import useData from 'hooks/useData/useData';
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

jest.setTimeout(15000);
describe('Error management for backend', () => {
  const spy = jest.spyOn(console, 'error');

  test('Returns an error if backend is down', async () => {
    const props = {
      latitude: 48.8534,
      longitude: 2.3488,
    };

    const { result, waitFor } = renderHook(() => useData(props), { wrapper });

    await waitFor(() => result.current.isError, { timeout: 15000 });

    expect(result.current.error?.message).toContain('Network request failed');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('Returns an error when latitude and longitude are NaN', async () => {
    const props = {
      latitude: NaN,
      longitude: NaN,
    };

    const { result, waitFor } = renderHook(() => useData(props), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(null);
  });
});

test('Returns data successfully if latitude and longitude are numbers', async () => {
  const props = {
    latitude: 48.8534,
    longitude: 2.3488,
  };

  const response = {
    id: '81874',
    createdAt: '2021-01-14T10:05:26.453Z',
    updatedAt: '2021-01-14T10:05:26.453Z',
    deletedAt: 'null',
    datetime: '2021-01-14T09:00:00.000Z',
    value: '0.1',
    stationId: '1',
    pollutantId: '1',
  };

  nock('http://localhost:5000')
    .persist()
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get(`/pollutant-data/${props.latitude}/${props.longitude}`)
    .reply(200, response);

  const { result, waitFor } = renderHook(() => useData(props), { wrapper });

  await waitFor(() => result.current.isFetching);
  await waitFor(() => !result.current.isFetching);

  expect(result.current.data).toStrictEqual(response);
});
