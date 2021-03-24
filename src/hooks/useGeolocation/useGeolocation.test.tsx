import { renderHook, act } from '@testing-library/react-hooks';
import useGeolocation from 'hooks/useGeolocation/useGeolocation';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import geolocate from 'mock-geolocation';
import { LocationTypes } from 'interfaces/location';

configure({ adapter: new Adapter() });

const errors = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

describe('Geolocation is not supported', () => {
  test('Returns an error when geolocation is not supported', () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.error).toContain(
      "La géolocalisation n'est pas supportée par votre navigateur. Veuillez changer de navigateur ou renseigner une addresse.",
    );
  });
});

describe('Geolocation is supported', () => {
  test('Returns correct longitude and latitude with no error', () => {
    geolocate.use();
    const coords = [48.8534, 2.3488];
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      geolocate.send({ lat: coords[0], lng: coords[1] });
    });

    expect(result.current).toStrictEqual({
      latitude: coords[0],
      longitude: coords[1],
      error: '',
      type: LocationTypes.Geolocation,
    });
    geolocate.restore();
  });

  test('Updates latitude and longitude if there is a significant change', () => {
    geolocate.use();
    const originalCoords = [48.8534, 2.3488];
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      geolocate.send({ lat: originalCoords[0], lng: originalCoords[1] });
    });

    const newCoords = [48.8574, 2.3408];
    act(() => {
      geolocate.send({ lat: newCoords[0], lng: newCoords[1] });
    });

    expect(result.current).toStrictEqual({
      latitude: newCoords[0],
      longitude: newCoords[1],
      error: '',
      type: LocationTypes.Geolocation,
    });
    geolocate.restore();
  });

  test('Does not update latitude and longitude if there no significant change', () => {
    geolocate.use();
    const originalCoords = [48.8534, 2.3488];
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      geolocate.send({ lat: originalCoords[0], lng: originalCoords[1] });
    });

    const newCoords = [48.853400001, 2.348800001];
    act(() => {
      geolocate.send({ lat: newCoords[0], lng: newCoords[1] });
    });

    expect(result.current).toStrictEqual({
      latitude: originalCoords[0],
      longitude: originalCoords[1],
      error: '',
      type: LocationTypes.Geolocation,
    });
    geolocate.restore();
  });

  test('Returns error message when geolocation permission is denied timeout', () => {
    geolocate.use();
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      geolocate.sendError({ code: errors.PERMISSION_DENIED });
    });

    expect(result.current.error).toContain(
      'Vous n’avez pas autorisé la géolocalisation. Veuillez renseigner une adresse',
    );
    geolocate.restore();
  });

  test('Returns error message when geolocation fails because an internal source of position returned an internal error.', () => {
    geolocate.use();
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      geolocate.sendError({ code: errors.POSITION_UNAVAILABLE });
    });

    expect(result.current.error).toContain(
      'Erreur lors de la géolocalisation : La position n’a pas pu être déterminée',
    );
    geolocate.restore();
  });

  test('Returns error message when the time allowed to get the geolocation is reached', () => {
    geolocate.use();
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      geolocate.sendError({ code: errors.TIMEOUT });
    });

    expect(result.current.error).toContain(
      'Erreur lors de la géolocalisation : Timeout !',
    );
    geolocate.restore();
  });
});
