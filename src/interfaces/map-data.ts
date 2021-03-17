import IPollutantData from './pollutant-data';

export default interface IMapData {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  datetime: string;
  name: string;
  longitude: number;
  latitude: number;
  externalId: number;
  data: IPollutantData[];
}
