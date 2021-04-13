import React, {useEffect, useState} from "react";
import {fetchFilteredProductionMetrics} from "../API";
import "./ExcellenceCenterTable.scss";
import {DataProcessing} from "../DataProcessing";

const ExcellenceCenterTable = ({excellenceCenter, projectType, year}) => {

    const productionMetricsLabels =  ["CA (k€)", "TJM (€)", "# Jours dispo",  "# Jours prod", "# Jours interP", "TO (%)"]
    const frenchMonths = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]

    const [selectedYearProductionMetrics, changeProductionMetrics] = useState(null)

    useEffect(() => {

        const setProductionMetricsWithFilters = async () => {
            changeProductionMetrics((await fetchFilteredProductionMetrics({excellenceCenter, year, projectType})))
        }
        setProductionMetricsWithFilters()

    }, [excellenceCenter, projectType, year])
    const months = selectedYearProductionMetrics && Object.keys(selectedYearProductionMetrics)


    const getProductionMetricsValuesFromJson = (productionMetric) => {
        return months.map(month => selectedYearProductionMetrics[month][productionMetric])
    }

    const extractProductionMetricFromJson = (productionMetric) => {
        if (months && selectedYearProductionMetrics) {
            if (productionMetric == "TO") {
                const productionDaysValues = getProductionMetricsValuesFromJson("productionDays")
                const availableDaysValues = getProductionMetricsValuesFromJson("availableDays")
                return DataProcessing.computeTOs(availableDaysValues, productionDaysValues)
            } else {
                return getProductionMetricsValuesFromJson(productionMetric)
            }
        }
    }

    const computeCumulatedMetricsFromJson = (productionMetric) => {
        if (months && selectedYearProductionMetrics) {
            if (productionMetric == "TO"){
                // we can not use generic method because available days change for each month
                return DataProcessing.computeCumulatedTOs(
                    months,
                    getProductionMetricsValuesFromJson("availableDays"),
                    getProductionMetricsValuesFromJson("productionDays"))
            } else {
                return DataProcessing.computeGenericCumulatedMetrics(
                    months,
                    getProductionMetricsValuesFromJson(productionMetric),
                    productionMetric)
            }
        }
    }

    const computeActualTotalMetrics = (ProductionMetric) => {
        if (months && selectedYearProductionMetrics) {
            const computedValues = computeCumulatedMetricsFromJson(ProductionMetric)
            return computedValues[computedValues.length - 1]
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
                        {productionMetricsLabels.map((item, index) =>
                            <th key={index} id="month-cell-item">{item}</th>)}
                        {productionMetricsLabels.map((item, index) =>
                            <th key={index} >{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {selectedYearProductionMetrics && months && months.map((month, index) =>
                        <tr key={index} className="ExcellenceCenterTable__row">
                            <td key={index} className="ExcellenceCenterTable__row-item">{frenchMonths[index]}</td>
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
                            <td className="ExcellenceCenterTable__row-total-item__CA">{computeActualTotalMetrics("CA")}</td>
                            <td></td>
                            <td className="ExcellenceCenterTable__row-total-item">{computeActualTotalMetrics("availableDays")}</td>
                            <td className="ExcellenceCenterTable__row-total-item">{computeActualTotalMetrics("productionDays")}</td>
                            <td className="ExcellenceCenterTable__row-total-item">{computeActualTotalMetrics("interProductionDays")}</td>
                        </tr>
                </tbody>
            </table>
        </>
    )
}


export default ExcellenceCenterTable