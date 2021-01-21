import { createContext, useContext } from 'react';
import ILocation, { LocationTypes } from 'interfaces/location';

export type LocationContextType = {
  location: ILocation;
  setLocation: (ILocation: ILocation) => void;
};

export const LocationContext = createContext<LocationContextType>({
  location: {
    latitude: NaN,
    longitude: NaN,
    error: '',
    type: LocationTypes.None,
  },
  setLocation: (location) => console.log(location),
});

export const useLocation = (): LocationContextType =>
  useContext(LocationContext);

export const equals = function (
  location: ILocation,
  geolocation: ILocation,
): boolean {
  //Converting to string because we can't compare NaN with == or ===
  const locationValues: string[] = Object.values(location).map((x) =>
    x.toString(),
  );
  const geolocationValues: string[] = Object.values(geolocation).map((x) =>
    x.toString(),
  );

  for (const idx in locationValues) {
    if (locationValues[idx] != geolocationValues[idx]) {
      return false;
    }
  }

  return true;
};
