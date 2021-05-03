import React from 'react';
import {
  PRODUCTION_CA, PRODUCTION_TJM,
} from './keys';

const computeSum = (values) => values.reduce((a, b) => a + b, 0);

const computeAverage = (values) => computeSum(values) / values.length;

const collectInternalReportOfActors = (nbOfTimeReports, internalFormationTimeReports) => {
  const userIdOfFormationActors = new Set();
  for (let j = 0; j < nbOfTimeReports; j += 1) {
    if (internalFormationTimeReports[j].contribution !== 'disciple') {
      userIdOfFormationActors.add(internalFormationTimeReports[j].userId);
    }
  }
  return userIdOfFormationActors;
};

export default class DataProcessing extends React.Component {
  static computeGenericCumulatedMetrics(months, productionMetricValues, productionMetricLabel) {
    const cumulatedValues = [];
    months.forEach((month, index) => {
      const monthlyProductionMetricValues = productionMetricValues.slice(0, index + 1);

      if (productionMetricLabel === PRODUCTION_CA) {
        cumulatedValues.push(computeSum(monthlyProductionMetricValues) / 1000);
      } else if (productionMetricLabel === PRODUCTION_TJM) {
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
    return availableDaysValues.map(
      (day, index) => ((productionDaysValues[index] / day) * 100).toFixed(2),
    );
  }

  static collectInternalFormationsDetails(formationsDetails) {
    const internalFormationsDetails = [];
    for (let i = 0; i < formationsDetails.length; i += 1) {
      if (formationsDetails[i].external === false) {
        internalFormationsDetails.push(formationsDetails[i]);
      }
    }
    return internalFormationsDetails;
  }

  static collectUserIdOfActors(InternalFormationsDetails) {
    const userIdOfAllActors = [];
    for (let i = 0; i < InternalFormationsDetails.length; i += 1) {
      let userIdOfFormationActors = new Set();
      const internalFormationTimeReports = InternalFormationsDetails[i].timeReports;
      const nbOfTimeReports = internalFormationTimeReports.length;

      userIdOfFormationActors = collectInternalReportOfActors(
        nbOfTimeReports, internalFormationTimeReports,
      );

      userIdOfAllActors.push(userIdOfFormationActors);
    }
    return userIdOfAllActors;
  }
}
