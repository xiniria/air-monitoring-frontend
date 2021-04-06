import React, { useEffect } from 'react';
import HistoryValueDetails from 'components/HistoryValueDetails/HistoryValueDetails';
import { levels } from 'levels';
import {
  getPollutantById,
  getPollutantByWaqiName,
} from 'hooks/usePollutants/usePollutants';
import IPollutant from 'interfaces/pollutant';
import IPollutantData from 'interfaces/pollutant-data';
import { Bar } from 'react-chartjs-2';
import './HistoryChart.css';
import Chart, { ChartDataSets } from 'chart.js';

const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: 'numeric',
};

// Customization of the bar chart
const chartOptions: Chart.ChartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: 'easeInQuad',
    animateScale: true,
  },
  legend: {
    display: false,
    labels: {
      fontFamily: "Comfortaa, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          display: false,
        },
        gridLines: {
          drawTicks: false,
          lineWidth: 0,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontFamily:
            "Comfortaa, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: 10,
          fontStyle: 'bold',
          maxRotation: 0,
          minRotation: 0,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
  tooltips: {
    bodyAlign: 'center',
    titleAlign: 'center',
    footerAlign: 'center',
    xPadding: 10,
    yPadding: 5,
    caretSize: 0,
    position: 'custom',
    intersect: false,
    mode: 'index',
  },
};

// Customization of the tooltip position
Chart.Tooltip.positioners.custom = function (_elements, position) {
  return {
    x: position.x,
    y: 5,
  };
};

function HistoryChart(props: {
  data: IPollutantData[];
  pollutants: IPollutant[];
  pollutant: IPollutant;
}): JSX.Element {
  const [currentPollutant, setCurrentPollutant] = React.useState(
    {} as IPollutant,
  );
  const [currentValue, setCurrentValue] = React.useState(0);
  const [currentColor, setCurrentColor] = React.useState('');
  const [displayDetails, setDisplayDetails] = React.useState(false);

  useEffect(() => {
    if (currentPollutant.waqiName != props.pollutant.waqiName) {
      setDisplayDetails(false); // Don't display the details if the pollutant changed or isn't chosen yet
      const chartWrapper = document.getElementById('chartAreaWrapper');
      chartWrapper?.scrollTo(chartWrapper.scrollWidth, 0); // Scroll the chart to the most recent value
    }
  });

  // Group the data by pollutant for easier use
  const groupedData = groupHistoryByPollutant(
    props.data || [],
    props.pollutants || [],
  );

  const pollutantDataset = groupedData[props.pollutant.waqiName] || [];

  // Function to get and format the timestamp to display
  const getTimestamps = (dataset: IPollutantData[]): string[][] => {
    const timestamps = dataset.map((entry) =>
      new Date(entry.datetime)
        .toLocaleDateString('fr', options)
        .split(/[à,]/)
        .reverse(),
    );
    return timestamps;
  };

  // Function to get the values of each data
  const getValues = (dataset: IPollutantData[]): number[] => {
    const values = dataset.map((entry) => entry.value);
    return values;
  };

  // Function to get the color for each bar
  const getLevelColor = (dataset: IPollutantData[]): string[] => {
    const level = levels[props.pollutant.waqiName];
    const levelColors = dataset.map(function (entry) {
      if (entry.value <= level[0]) {
        return 'mediumseagreen'; //good
      } else if (entry.value > level[1]) {
        return 'crimson'; //bad
      } else {
        return 'darkorange'; //average
      }
    });
    return levelColors;
  };

  const timestamps = getTimestamps(pollutantDataset);
  const values = getValues(pollutantDataset);
  const colors = getLevelColor(pollutantDataset);

  // Dataset to display
  const dataset: ChartDataSets = {
    label: props.pollutant.waqiName,
    backgroundColor: colors.reverse(),
    data: values.reverse(),
    barPercentage: 0.3,
  };

  // Chart to display
  const dataChart = {
    labels: timestamps.reverse(),
    datasets: [dataset],
  };

  // For the history value details, we use the information provided by the tooltip
  // How it works: When we click on a bar, we set the current properties to those of the current bar
  //, and then display the details as well as the tooltip
  const infoSection = document.getElementById('infos');

  if (chartOptions.tooltips)
    chartOptions.tooltips.callbacks = {
      label: function (tooltipItem) {
        if (infoSection) infoSection.style.display = 'block';
        setCurrentPollutant(
          getPollutantByWaqiName(props.pollutants, dataset.label || ''),
        );
        setCurrentValue(Number(tooltipItem.yLabel));
        setCurrentColor(colors[tooltipItem.index || 0]);
        setDisplayDetails(true);
        return dataset.label?.toUpperCase() + ' : ' + tooltipItem.yLabel;
      },
    };

  if (dataset.data?.length === 0) {
    return (
      <div className="chartWrapper">
        <div id="chartAreaWrapper">
          <p>
            La station la plus proche de votre localisation n&apos;a aucune
            information concernant ce polluant pour l&apos;instant.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="chartWrapper">
      <div id="chartAreaWrapper">
        <Bar
          data={dataChart}
          width={1500}
          height={250}
          options={chartOptions}
        />
      </div>
      {displayDetails ? (
        <div id="infos">
          <HistoryValueDetails
            pollutant={currentPollutant}
            value={currentValue}
            level={currentColor}
          />
        </div>
      ) : (
        <p>Appuyez sur le graphe pour plus de détails !</p>
      )}
    </div>
  );
}

// Function to group the data from the API by pollutant for easier use during rendering
const groupHistoryByPollutant = (
  data: IPollutantData[],
  pollutants: IPollutant[],
): { [waqiName: string]: IPollutantData[] } => {
  const groupedData: { [waqiName: string]: IPollutantData[] } = {};

  for (const entry of data) {
    const pollutant = getPollutantById(pollutants, entry.pollutantId);
    const waqiName = pollutant.waqiName;

    groupedData[waqiName]
      ? groupedData[waqiName].push(entry)
      : (groupedData[waqiName] = [entry]);
  }

  return groupedData;
};

export default HistoryChart;
