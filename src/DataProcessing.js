import React from "react";

const computeSum = (values) => {
    return values.reduce((a, b) => a + b, 0);
}

const computeAverage = (values) => {
    return computeSum(values) / values.length;
}

export class DataProcessing extends React.Component {

    static computeGenericCumulatedMetrics(months, productionMetricValues, productionMetricLabel) {
        let cumulatedValues = []
        months.forEach((month, index) => {
            let monthlyProductionMetricValues = productionMetricValues.slice(0, index + 1);

            if(productionMetricLabel == "CA"){
                cumulatedValues.push(computeSum(monthlyProductionMetricValues)/1000);
            } else if (productionMetricLabel == "TJM") {
                cumulatedValues.push(computeAverage(monthlyProductionMetricValues).toFixed(2))
            }
            else {
                cumulatedValues.push(computeSum(monthlyProductionMetricValues));
            }
        })
        return cumulatedValues
    }

    static computeCumulatedTOs(months, availableDaysValues, productionDaysValues){
        let collectedSumOfProductionDays =[]
        let collectedSumOfAvailableDays =[]
        let allTOCumulatedValues = []

        months.forEach((month, index) => {
            const monthlyProductionDaysValues = productionDaysValues.slice(0, index + 1);
            collectedSumOfProductionDays.push(computeSum(monthlyProductionDaysValues))

            const monthlyAvailableDaysValues = availableDaysValues.slice(0, index + 1);
            collectedSumOfAvailableDays.push(computeSum(monthlyAvailableDaysValues))
        })
        for (let i = 0 ; i < months.length ; i++){
            let cumulatedTOValues = collectedSumOfProductionDays[i]/collectedSumOfAvailableDays[i]
            allTOCumulatedValues.push((cumulatedTOValues*100).toFixed(2))
        }
        return allTOCumulatedValues

    }
}





