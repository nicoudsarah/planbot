import React from "react";

const computeSum = (values) => {
    return values.reduce((a, b) => a + b, 0);
}

export class DataProcessing extends React.Component {

    static calculateValueToDisplayForProductionMetrics(months, productionMetricsValues, productionMetricsLabel) {
        let eachMonthProductionMetricValues = null
        let collectionOfProductionMetricsValuesAdded = []
        months.forEach((month, index) => {
            eachMonthProductionMetricValues = productionMetricsValues.slice(0, index + 1); // On récupère les valeurs de la métrique de chaque mois
            const sumOfProductionMetricValues = computeSum(eachMonthProductionMetricValues);  //on somme ces valeurs
            if(productionMetricsLabel == "CA"){
                collectionOfProductionMetricsValuesAdded.push(sumOfProductionMetricValues/1000);
            } else {
                collectionOfProductionMetricsValuesAdded.push(sumOfProductionMetricValues);
            }
        })
        return collectionOfProductionMetricsValuesAdded
    }
}





