import { useEffect, useState } from 'react';
import { ILocation, LocationTypes } from 'LocationContext';

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
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentPos({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, positionError);
    } else {
      setError(
        "La géolocalisation n'est pas supportée par votre navigateur. Veuillez changer de navigateur ou renseigner une addresse.",
      );
    }
  }, [currentPos]);

  return { ...currentPos, error, type: LocationTypes.Geolocation };
}

export default useGeolocation;
