import React from "react";

const computeSum = (values) => {
    return values.reduce((a, b) => a + b, 0);
}

const computeAverage = (values) => {
    return computeSum(values) / values.length;
}

export class DataProcessing extends React.Component {

    static calculateValueToDisplayForProductionMetrics(months, productionMetricsValues, productionMetricsLabel) {
        //let eachMonthProductionMetricValues = null
        let collectionOfProductionMetricsValues = []
        months.forEach((month, index) => {
            let eachMonthProductionMetricValues = productionMetricsValues.slice(0, index + 1); // On récupère les valeurs de la métrique de chaque mois

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
}





