import React, { useEffect, useState } from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import PropTypes from 'prop-types';
import { fetchProductionMetrics } from '../API';
import DataProcessing from '../DataProcessing';
import {
  PRODUCTION_CA, PRODUCTION_TJM, PRODUCTION_AVAILABLEDAYS, PRODUCTION_PRODUCTIONDAYS, PRODUCTION_TO,
} from '../keys';

defaults.global.tooltips.enabled = false;

const ExcellenceCenterBarChart = ({ productionMetricsLabel }) => {
  const [monthlyProductionMetrics, changeProductionMetricsForEachMonth] = useState(null);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const setProductionMetricsWithFilters = async () => {
      setHasError(false);
      try {
        changeProductionMetricsForEachMonth(await fetchProductionMetrics());
      } catch (e) {
        setHasError(true);
      }
    };

    setProductionMetricsWithFilters();
  }, []);
  let months = [];
  if (monthlyProductionMetrics) {
    months = Object.keys(monthlyProductionMetrics);
  }

  const getProductionMetricsValuesFromJson = (label) => months
    .map((month) => monthlyProductionMetrics[month][label]);

  const extractProductionMetricFromJson = (label) => {
    if (months && monthlyProductionMetrics) {
      if (label === PRODUCTION_TO) {
        const productionDaysValues = getProductionMetricsValuesFromJson(PRODUCTION_PRODUCTIONDAYS);
        const availableDaysValues = getProductionMetricsValuesFromJson(PRODUCTION_AVAILABLEDAYS);
        return DataProcessing.computeTOs(availableDaysValues, productionDaysValues);
      } if (label === PRODUCTION_CA) {
        return getProductionMetricsValuesFromJson(label)
          .map((productionMetric) => productionMetric / 1000);
      }
      return getProductionMetricsValuesFromJson(label);
    }
    return '';
  };

  const displayMonthlyValues = extractProductionMetricFromJson(productionMetricsLabel);

  const computeCumulatedMetricsFromJson = (label) => {
    if (months && monthlyProductionMetrics) {
      if (label === PRODUCTION_TO) {
        // we can not use generic method because available days change for each month
        return DataProcessing.computeCumulatedTOs(
          months,
          getProductionMetricsValuesFromJson(PRODUCTION_AVAILABLEDAYS),
          getProductionMetricsValuesFromJson(PRODUCTION_PRODUCTIONDAYS),
        );
      }
      return DataProcessing.computeGenericCumulatedMetrics(
        months,
        getProductionMetricsValuesFromJson(label),
        label,
      );
    }
    return '';
  };

  const displayedCumulatedValues = computeCumulatedMetricsFromJson(productionMetricsLabel);

  const specifyUnity = (label) => {
    let unity;
    switch (label) {
      case PRODUCTION_CA: unity = '(k€)';
        break;
      case PRODUCTION_TJM: unity = '(€)';
        break;
      case PRODUCTION_TO: unity = '(%)';
        break;
      default:
        unity = '';
    }
    return unity;
  };

  const unity = specifyUnity(productionMetricsLabel);

  const manageYMaxAxis = (label) => {
    let yMax;
    if (months && monthlyProductionMetrics) {
      if (label === PRODUCTION_TO) {
        yMax = 120;
      } else if (label === PRODUCTION_TJM) {
        const maximumValue = Math.max(...displayMonthlyValues);
        // rounded up to the nearest ten to kept a beautiful y axe appearance
        yMax = 10 * Math.ceil((maximumValue + (20 * maximumValue) / 100) / 10);
      } else {
        const maximumValue = Math.max(...displayedCumulatedValues);
        // rounded up to the nearest ten to kept a beautiful y axe appearance
        yMax = 10 * Math.ceil((maximumValue + (20 * maximumValue) / 100) / 10);
      }
    }

    return yMax;
  };

  const yMax = manageYMaxAxis(productionMetricsLabel);

  const renderLoadingError = () => (
    <section>
      <h1>Le serveur Planbot a rencontré une erreur.</h1>
      <h2>Veuillez réactualiser la page.</h2>
    </section>
  );

  if (hasError) {
    return renderLoadingError();
  }
  return (
    <div>
      <Bar
        data={{
          labels: ['Janv', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: `Valeurs annuelles à date ${unity} *`,
              data: displayedCumulatedValues,
              pointBackgroundColor: 'white',
              pointBorderColor: '#A50040',
              pointBorderWidth: 3,
              radius: 15,
              borderColor: '#A50040',
              type: 'line',
              fill: false,
            },
            {
              label: `Valeurs mensuelles ${unity} *`,
              data: displayMonthlyValues,
              backgroundColor: '#7EA6E0',
              borderColor: '#006EAF',
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          hover: { mode: null },
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: yMax,
              },
            }],
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'black',
              labels: {
                title: {
                  font: {
                    weight: 'bold',
                  },
                },
              },
              anchor: 'end',
              align: 'end',
            },
          },
        }}
      />
    </div>
  );
};

ExcellenceCenterBarChart.propTypes = {
  productionMetricsLabel: PropTypes.string.isRequired,
};

export default ExcellenceCenterBarChart;
