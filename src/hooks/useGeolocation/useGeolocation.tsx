import { useEffect, useState } from 'react';
import ILocation, { LocationTypes } from 'interfaces/location';

export interface PositionError {
  code: number;
  TIMEOUT: number;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
}

function useGeolocation(): ILocation {
  const [currentPos, setCurrentPos] = useState({
    latitude: NaN,
    longitude: NaN,
  });
  const [error, setError] = useState('');

  const positionError = (postionError: PositionError) => {
    const errors = {
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    switch (postionError.code) {
      case errors.TIMEOUT:
        setError('Erreur lors de la géolocalisation : Timeout !');
        break;
      case errors.PERMISSION_DENIED:
        setError(
          'Vous n’avez pas autorisé la géolocalisation. Veuillez renseigner une adresse',
        );
        break;
      case errors.POSITION_UNAVAILABLE:
        setError(
          'Erreur lors de la géolocalisation : La position n’a pas pu être déterminée',
        );
        break;
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
      let isMounted = true;
      navigator.geolocation.getCurrentPosition(function (position) {
        if (
          isMounted &&
          (Number.isNaN(currentPos.latitude) ||
            Number.isNaN(currentPos.longitude) ||
            // don't change position if the change in geolocation is not significant
            Math.abs(position.coords.latitude - currentPos.latitude) >
              0.00001 ||
            Math.abs(position.coords.longitude - currentPos.longitude) >
              0.00001)
        ) {
          setCurrentPos({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      }, positionError);

      return () => {
        isMounted = false;
      };
    } else {
      setError(
        "La géolocalisation n'est pas supportée par votre navigateur. Veuillez changer de navigateur ou renseigner une addresse.",
      );
    }
  }, [currentPos]);

  return { ...currentPos, error, type: LocationTypes.Geolocation };
}

export default useGeolocation;
