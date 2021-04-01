import React from "react";

const computeSum = (values) => {
    return values.reduce((a, b) => a + b, 0);
}

const computeAverage = (values) => {
    return computeSum(values) / values.length;
}

export class DataProcessing extends React.Component {

    static calculateValueToDisplayForProductionMetricsExceptTO(months, productionMetricsValues, productionMetricsLabel) {
        let collectionOfProductionMetricsValues = []
        months.forEach((month, index) => {
            let eachMonthProductionMetricValues = productionMetricsValues.slice(0, index + 1);

            if(productionMetricsLabel == "CA"){
                const sumOfProductionMetricValues = computeSum(eachMonthProductionMetricValues);
                collectionOfProductionMetricsValues.push(sumOfProductionMetricValues/1000);
            } else if (productionMetricsLabel == "TJM") {
                const averageOfProductionMetrics = computeAverage(eachMonthProductionMetricValues);
                collectionOfProductionMetricsValues.push(averageOfProductionMetrics.toFixed(2))
            }
            else {
                const sumOfProductionMetricValues = computeSum(eachMonthProductionMetricValues);
                collectionOfProductionMetricsValues.push(sumOfProductionMetricValues);
            }
        })
        return collectionOfProductionMetricsValues
    }

    static calculateValueToDisplayForTOProductionMetrics(months, availableDaysValues, productionDaysValues){
        let collectedSumOfProductionDays =[]
        let collectedSumOfAvailableDays =[]
        let collectionOfTOValues = []
        months.forEach((month, index) => {
            const eachMonthProductionDaysValues = productionDaysValues.slice(0, index + 1);
            const eachMonthAvailableDaysValues = availableDaysValues.slice(0, index + 1);
            const sumOfProductionDays = computeSum(eachMonthProductionDaysValues)
            const sumOfAvailableDays = computeSum(eachMonthAvailableDaysValues)
            collectedSumOfProductionDays.push(sumOfProductionDays)
            collectedSumOfAvailableDays.push(sumOfAvailableDays)
        })
        for (var i = 0 ; i < months.length ; i++){
            let cumulatedTOvalues = ((collectedSumOfProductionDays[i]/collectedSumOfAvailableDays[i])*100).toFixed(2)
            collectionOfTOValues.push(cumulatedTOvalues)
        }
        return collectionOfTOValues

    }
}





