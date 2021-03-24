import React, {useEffect, useState} from "react";
import {fetchFilteredProductionMetrics} from "../API";
import "./ExcellenceCenterTable.scss";

const ExcellenceCenterTable = ({excellenceCenter, projectType, year}) => {

    const ProductionMetricsLabels =  ["CA", "TJM", "# Jours dispo",  "# Jours prod", "# Jours interP", "TO"]
    const ProductionMetricsJSONKeys =  ["CA", "TJM", "availableDays",  "productionDays", "interProductionDays", "TO"]

    const [selectedYearProductionMetrics, changeProductionMetrics] = useState(null)

    useEffect(() => {

        const setProductionMetricsWithFilters = async () => {
            changeProductionMetrics((await fetchFilteredProductionMetrics({excellenceCenter, year, projectType})))
        }
        setProductionMetricsWithFilters()



    }, [excellenceCenter, projectType, year])
    const months = selectedYearProductionMetrics && Object.keys(selectedYearProductionMetrics)


    const calculateAnnualDateValueForProductionMetrics = (ProductionMetric) => {
        let computedValues = []
        if (months && selectedYearProductionMetrics) {
            computedValues = months
                .map(month => selectedYearProductionMetrics[month][ProductionMetric])
                .reduce((acc, currentValue, index) => {
                    if (index === 0) {
                        acc.push(currentValue)
                        return acc;
                    }
                    acc.push(currentValue + acc[index - 1])
                    return acc;
                }, [])
        }
        return computedValues
    }

    const calculateActualTotalValueForProductionMetric = (ProductionMetric) => {
        if (months && selectedYearProductionMetrics) {
            const computedValues = calculateAnnualDateValueForProductionMetrics(ProductionMetric)
            const actualTotal = computedValues[computedValues.length - 1]
            return actualTotal
        }
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th colSpan="6" >Valeurs mensuelles</th>
                        <th colSpan="6" >Valeurs annuelles à date</th>
                    </tr>
                    <tr>
                        <th id="month-cell">Mois</th>
                        {ProductionMetricsLabels.map((item, index) =>
                            <th key={index} id="month-cell-item">{item}</th>)}
                        {ProductionMetricsLabels.map((item, index) =>
                            <th key={index} >{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {selectedYearProductionMetrics && months && months.map((month, index) =>
                        <tr key={index} className="ExcellenceCenterTable__row">
                            <td key={index} className="ExcellenceCenterTable__row-item">{month}</td>
                            <td className="ExcellenceCenterTable__row-item__CA">{selectedYearProductionMetrics[month].CA}</td>
                            <td className="ExcellenceCenterTable__row-item__TJM">{selectedYearProductionMetrics[month].TJM}</td>
                            <td className="ExcellenceCenterTable__row-item__availableDays">{selectedYearProductionMetrics[month].availableDays}</td>
                            <td className="ExcellenceCenterTable__row-item">{selectedYearProductionMetrics[month].productionDays}</td>
                            <td className="ExcellenceCenterTable__row-item">{selectedYearProductionMetrics[month].interProductionDays}</td>
                            <td className="ExcellenceCenterTable__row-item">{selectedYearProductionMetrics[month].TO}</td>

                            <td className="ExcellenceCenterTable__row-item__CA">{calculateAnnualDateValueForProductionMetrics(ProductionMetricsJSONKeys[0])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{calculateAnnualDateValueForProductionMetrics(ProductionMetricsJSONKeys[1])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{calculateAnnualDateValueForProductionMetrics(ProductionMetricsJSONKeys[2])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{calculateAnnualDateValueForProductionMetrics(ProductionMetricsJSONKeys[3])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{calculateAnnualDateValueForProductionMetrics(ProductionMetricsJSONKeys[4])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{parseInt(calculateAnnualDateValueForProductionMetrics(ProductionMetricsJSONKeys[5])[index]/(index+1))}</td>
                        </tr>)}
                        <tr>
                            <td className="ExcellenceCenterTable__row-total-item">Total annuel</td>
                            <td className="ExcellenceCenterTable__row-total-item__CA">{calculateActualTotalValueForProductionMetric(ProductionMetricsJSONKeys[0])}</td>
                            <td></td>
                            <td className="ExcellenceCenterTable__row-total-item">{calculateActualTotalValueForProductionMetric(ProductionMetricsJSONKeys[2])}</td>
                            <td className="ExcellenceCenterTable__row-total-item">{calculateActualTotalValueForProductionMetric(ProductionMetricsJSONKeys[3])}</td>
                            <td className="ExcellenceCenterTable__row-total-item">{calculateActualTotalValueForProductionMetric(ProductionMetricsJSONKeys[4])}</td>
                        </tr>
                </tbody>
            </table>
        </>
    )
}


export default ExcellenceCenterTable