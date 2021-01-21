export enum LocationTypes {
  Geolocation = 'geolocation',
  Address = 'address',
  None = 'none',
}

export default interface ILocation {
  latitude: number;
  longitude: number;
  error: string;
  type: LocationTypes;
}
