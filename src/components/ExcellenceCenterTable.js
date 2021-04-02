import React, {useEffect, useState} from "react";
import {fetchFilteredProductionMetrics} from "../API";
import "./ExcellenceCenterTable.scss";
import {DataProcessing} from "../DataProcessing";

const ExcellenceCenterTable = ({excellenceCenter, projectType, year}) => {

    const ProductionMetricsLabels =  ["CA (k€)", "TJM", "# Jours dispo",  "# Jours prod", "# Jours interP", "TO"]
    const ProductionMetricsJSONKeys =  ["CA", "TJM", "availableDays",  "productionDays", "interProductionDays", "TO"]

    const [selectedYearProductionMetrics, changeProductionMetrics] = useState(null)

    useEffect(() => {

        const setProductionMetricsWithFilters = async () => {
            changeProductionMetrics((await fetchFilteredProductionMetrics({excellenceCenter, year, projectType})))
        }
        setProductionMetricsWithFilters()



    }, [excellenceCenter, projectType, year])
    const months = selectedYearProductionMetrics && Object.keys(selectedYearProductionMetrics)

    const getProductionMetricsValuesFromJson = (productionMetricsLabel) => {
        return months.map(month => selectedYearProductionMetrics[month][productionMetricsLabel]);
    }

    const extractProductionMetricFromJson = (productionMetricsLabel) => {
        if (months && selectedYearProductionMetrics) {
            if (productionMetricsLabel == "TO") {
                const productionDaysValues = getProductionMetricsValuesFromJson("productionDays")
                const availableDaysValues = getProductionMetricsValuesFromJson("availableDays")
                return DataProcessing.computeTOs(availableDaysValues, productionDaysValues)
            } else {
                return getProductionMetricsValuesFromJson(productionMetricsLabel)
            }
        }
    }

    const computeCumulatedMetricsFromJson = (productionMetricsLabel) => {
        if (months && selectedYearProductionMetrics) {
            if (productionMetricsLabel == "TO"){
                // we can not use generic method because available days change for each month
                return DataProcessing.computeCumulatedTOs(
                    months,
                    getProductionMetricsValuesFromJson("availableDays"),
                    getProductionMetricsValuesFromJson("productionDays"))
            } else {
                return DataProcessing.computeGenericCumulatedMetrics(
                    months,
                    getProductionMetricsValuesFromJson(productionMetricsLabel),
                    productionMetricsLabel)
            }
        }
    }


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
                            <td className="ExcellenceCenterTable__row-item__CA">{(extractProductionMetricFromJson("CA")[index])/1000}</td>
                            <td className="ExcellenceCenterTable__row-item__TJM">{extractProductionMetricFromJson("TJM")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item__availableDays">{extractProductionMetricFromJson("availableDays")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{extractProductionMetricFromJson("productionDays")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{extractProductionMetricFromJson("interProductionDays")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{extractProductionMetricFromJson("TO")[index]}</td>

                            <td className="ExcellenceCenterTable__row-item__CA">{computeCumulatedMetricsFromJson("CA")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson("TJM")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson("availableDays")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson("productionDays")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson("interProductionDays")[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson("TO")[index]}</td>
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