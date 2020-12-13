import { renderHook, act } from '@testing-library/react-hooks';
import Geolocation from 'components/Geolocation/Geolocation';
import geolocate from 'mock-geolocation';

const errors = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

describe('Geolocation is not supported', () => {
  test('Returns an error when geolocation is not supported', () => {
    const { result } = renderHook(() => Geolocation());
    expect(result.current.error.length).toBeGreaterThan(0);
  });
});

describe('Geolocation is supported', () => {
  test('Returns correct longitude and latitude with no error', () => {
    geolocate.use();
    const coords = [48.8534, 2.3488];
    const { result } = renderHook(() => Geolocation());

    act(() => {
      geolocate.change({ lat: coords[0], lng: coords[1] });
    });

    expect(result.current).toStrictEqual({
      latitude: coords[0],
      longitude: coords[1],
      error: '',
    });
    geolocate.restore();
  });

  test('Returns error message when geolocation permission is denied timeout', () => {
    geolocate.use();
    const { result } = renderHook(() => Geolocation());

    act(() => {
      geolocate.changeError({ code: errors.PERMISSION_DENIED });
    });

    expect(result.current.error).toContain(
      'Vous n’avez pas autorisé la géolocalisation. Veuillez renseigner une adresse',
    );
    geolocate.restore();
  });

  test('Returns error message when geolocation fails because an internal source of position returned an internal error.', () => {
    geolocate.use();
    const { result } = renderHook(() => Geolocation());

    act(() => {
      geolocate.changeError({ code: errors.POSITION_UNAVAILABLE });
    });

    expect(result.current.error).toContain(
      'Erreur lors de la géolocalisation : La position n’a pas pu être déterminée',
    );
    geolocate.restore();
  });

  test('Returns error message when the time allowed to get the geolocation is reached', () => {
    geolocate.use();
    const { result } = renderHook(() => Geolocation());

    act(() => {
      geolocate.changeError({ code: errors.TIMEOUT });
    });

    expect(result.current.error).toContain(
      'Erreur lors de la géolocalisation : Timeout !',
    );
    geolocate.restore();
  });
});
