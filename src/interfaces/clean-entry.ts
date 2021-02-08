export default interface ICleanEntry {
  id: number;
  updatedAt: string;
  pollutantId: number;
  fullName: string;
  shortName: string;
  value: number;
  level: string;
  isPollutant: boolean;
  unit: string;
}
