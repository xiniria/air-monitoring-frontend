export default interface IPollutant {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  fullName: string;
  shortName: string;
  description: string;
  waqiName: string;
  isPollutant: boolean;
  unit: string;
}
