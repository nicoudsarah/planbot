import React from 'react';

const computeSum = (values) => values.reduce((a, b) => a + b, 0);

const computeAverage = (values) => computeSum(values) / values.length;

export default class DataProcessing extends React.Component {
  static computeGenericCumulatedMetrics(months, productionMetricValues, productionMetricLabel) {
    const cumulatedValues = [];
    months.forEach((month, index) => {
      const monthlyProductionMetricValues = productionMetricValues.slice(0, index + 1);

      if (productionMetricLabel === 'CA') {
        cumulatedValues.push(computeSum(monthlyProductionMetricValues) / 1000);
      } else if (productionMetricLabel === 'TJM') {
        cumulatedValues.push(computeAverage(monthlyProductionMetricValues).toFixed(2));
      } else {
        cumulatedValues.push(computeSum(monthlyProductionMetricValues));
      }
    });
    return cumulatedValues;
  }

  static computeCumulatedTOs(months, availableDaysValues, productionDaysValues) {
    const collectedSumOfProductionDays = [];
    const collectedSumOfAvailableDays = [];
    const allTOCumulatedValues = [];

    months.forEach((month, index) => {
      const monthlyProductionDaysValues = productionDaysValues.slice(0, index + 1);
      collectedSumOfProductionDays.push(computeSum(monthlyProductionDaysValues));

      const monthlyAvailableDaysValues = availableDaysValues.slice(0, index + 1);
      collectedSumOfAvailableDays.push(computeSum(monthlyAvailableDaysValues));
    });
    for (let i = 0; i < months.length; i += 1) {
      const cumulatedTOValues = collectedSumOfProductionDays[i] / collectedSumOfAvailableDays[i];
      allTOCumulatedValues.push((cumulatedTOValues * 100).toFixed(2));
    }
    return allTOCumulatedValues;
  }

  static computeTOs(availableDaysValues, productionDaysValues) {
    // const TOValues = [];
    return availableDaysValues.map(
      (day, index) => ((productionDaysValues[index] / day) * 100).toFixed(2),
    );
    /* or (let i = 0; i < productionDaysValues.length; i += 1) {
      TOValues.push(((productionDaysValues[i] / availableDaysValues[i]) * 100).toFixed(2));
    } */
    // return TOValues;
  }
}
