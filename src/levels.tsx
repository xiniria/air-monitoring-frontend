//Pollutant level for color coding
const aqiLevel = [50, 150];
const coLevel = [9.5, 12.5];
const no2Level = [0.101, 0.361];
const o3Level = [0.076, 0.096];
const pm10Level = [155, 255];
const pm25Level = [35.5, 55.5];
const so2Level = [36, 76];

const levels: { [waqiName: string]: number[] } = {
  aqi: aqiLevel,
  co: coLevel,
  no2: no2Level,
  o3: o3Level,
  pm10: pm10Level,
  pm25: pm25Level,
  so2: so2Level,
};

// "Max" levels of the pollutants for the gauge
const maxLevels: { [waqiName: string]: number } = {
  aqi: 200,
  co: 15.5,
  no2: 0.65,
  o3: 0.096,
  pm10: 355,
  pm25: 150.5,
  so2: 304,
};

export { levels, maxLevels };
