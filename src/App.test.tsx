import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { configure } from 'enzyme';
import geolocate from 'mock-geolocation';
import App from 'App';
import { LocationTypes } from 'interfaces/location';

configure({ adapter: new Adapter() });

process.env.REACT_APP_RENDER_REACT_QUERY_DEVTOOLS = 'false';

test('renders without crashing', () => {
  render(<App />);
});

test('renders Location link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Location/i);
  expect(linkElement).toBeInTheDocument();
});

test('Displays an error when geolocation is not supported', () => {
  render(<App />);
  const errorDisplay = screen.getByText(/La géolocalisation/i);
  expect(errorDisplay).toBeInTheDocument();
});

describe('Update location information correctly', () => {
  test('Renders geolocation location correctly', () => {
    geolocate.use();
    const coords = [48.8534, 2.3488];
    const { result } = renderHook(() => App());

    act(() => {
      geolocate.send({ lat: coords[0], lng: coords[1] });
    });

    const location = result.current.props.value.location;

    expect(location).toStrictEqual({
      latitude: coords[0],
      longitude: coords[1],
      error: '',
      type: LocationTypes.Geolocation,
    });
    geolocate.restore();
  });

  test('Update geolocation location correctly', () => {
    geolocate.use();
    let coords = [48.8534, 2.3488];
    const { result } = renderHook(() => App());

    act(() => {
      geolocate.send({ lat: coords[0], lng: coords[1] });
    });

    coords = [35.855, 2.456];
    act(() => {
      geolocate.send({ lat: coords[0], lng: coords[1] });
    });

    const location = result.current.props.value.location;

    expect(location).toStrictEqual({
      latitude: coords[0],
      longitude: coords[1],
      error: '',
      type: LocationTypes.Geolocation,
    });
    geolocate.restore();
  });

  test('Display geolocation error correctly', () => {
    geolocate.use();
    const { result } = renderHook(() => App());

    act(() => {
      geolocate.sendError({ code: 1 });
    });

    const location = result.current.props.value.location;

    expect(location).toStrictEqual({
      latitude: NaN,
      longitude: NaN,
      error:
        'Vous n’avez pas autorisé la géolocalisation. Veuillez renseigner une adresse',
      type: LocationTypes.Geolocation,
    });
    geolocate.restore();
  });
});
