import React, {useEffect, useState} from "react";
import {Bar, defaults} from "react-chartjs-2"
import 'chartjs-plugin-datalabels';
import {fetchProductionMetrics} from "../API";
import {DataProcessing} from "../DataProcessing";

defaults.global.tooltips.enabled = false


const ExcellenceCenterBarChart = ({productionMetricsLabel}) => {

    const [monthlyProductionMetrics, changeProductionMetricsForEachMonth] = useState(null)


    useEffect(() => {

        const setProductionMetricsWithFilters = async () => {
            changeProductionMetricsForEachMonth(await fetchProductionMetrics())
        }

        setProductionMetricsWithFilters()

    }, [])
    let months = []
    if (monthlyProductionMetrics) {
        months = Object.keys(monthlyProductionMetrics)
    }


    const getProductionMetricsValuesFromJson = (productionMetricsLabel) => {
        return months.map(month => monthlyProductionMetrics[month][productionMetricsLabel]);
    }

    console.log(getProductionMetricsValuesFromJson("CA"))

    const extractProductionMetricFromJson = (productionMetricsLabel) => {
        if (months && monthlyProductionMetrics) {
            if (productionMetricsLabel == "TO") {
                const productionDaysValues = getProductionMetricsValuesFromJson("productionDays")
                const availableDaysValues = getProductionMetricsValuesFromJson("availableDays")
                return DataProcessing.computeTOs(availableDaysValues, productionDaysValues)
            } else if (productionMetricsLabel == "CA") {
                return getProductionMetricsValuesFromJson(productionMetricsLabel).map(productionMetric => productionMetric/1000)
            } else {
                return getProductionMetricsValuesFromJson(productionMetricsLabel)
            }
        }
    }

    const displayMonthlyValues = extractProductionMetricFromJson (productionMetricsLabel)
    console.log(extractProductionMetricFromJson ("CA"))
    console.log(extractProductionMetricFromJson (productionMetricsLabel))


    const computeCumulatedMetricsFromJson = (productionMetricsLabel) => {
        if (months && monthlyProductionMetrics) {
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

    const displayedCumulatedValues = computeCumulatedMetricsFromJson(productionMetricsLabel)


    return <div>
        <Bar
            data={{
                labels: ['Janv', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Cumul annuel à date',
                        data: displayedCumulatedValues,
                        pointBackgroundColor: 'white',
                        pointBorderColor: '#A50040',
                        pointBorderWidth: 3,
                        radius: 15,
                        borderColor: '#A50040',
                        type: 'line',
                        fill: false
                    },
                    {
                        label: 'Valeurs mensuelles',
                        data:  displayMonthlyValues,
                        backgroundColor: '#7EA6E0',
                        borderColor: '#006EAF',
                        borderWidth: 1
                    }
                ]
            }}
            height={400}
            width={600}
            options={{
                hover: {mode: null},
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                plugins: {
                    datalabels: {
                        display: 'auto',
                        color: 'black',
                        labels: {
                            title: {
                                font: {
                                    weight: 'bold'
                                }
                            },
                        },
                        anchor: 'end',
                        align: 'end',
                    }
                }
            }}
        />
    </div>


}

export default ExcellenceCenterBarChart
