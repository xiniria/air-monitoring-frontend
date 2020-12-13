import { useState, useLayoutEffect } from 'react';

export interface PositionError {
  code: number;
  TIMEOUT: number;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
}

export interface IGeolocation {
  latitude: number;
  longitude: number;
  error: string;
}

function Geolocation(): IGeolocation {
  const [location, setPosition] = useState({
    latitude: NaN,
    longitude: NaN,
  });

  const [error, setError] = useState('');

  const positionError = (error: PositionError) => {
    const errors = {
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    switch (error.code) {
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

  useLayoutEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, positionError);
    } else {
      setError(
        "La géolocalisation n'est pas supportée par votre navigateur. Veuillez changer de navigateur ou renseigner une addresse.",
      );
    }
  });

  return { ...location, error };
}

export default Geolocation;
