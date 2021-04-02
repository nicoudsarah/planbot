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



    const extractProductionMetricsValues = (productionMetricsLabel) => {
        let metricValues = []
        if (months.length>0 && monthlyProductionMetrics) {
            metricValues = months.map((month) => {
                return monthlyProductionMetrics[month][productionMetricsLabel]
            })
        }
        return metricValues.length>0 ? metricValues : []
    }

    let productionMetricsValues = []
    productionMetricsValues = extractProductionMetricsValues(productionMetricsLabel)


    const getProductionMetricsValuesFromJson = (productionMetricsLabel) => {
        return months.map(month => monthlyProductionMetrics[month][productionMetricsLabel]);
    }

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
                    "TO")
            }
        }
    }

    const displayedCumulatedValues = computeCumulatedMetricsFromJson("TO")


    return <div>
        <Bar
            data={{
                labels: ['Janv', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Cumul annuel à date (€)',
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
                        label: 'Valeurs mensuelles (€)',
                        data:  productionMetricsValues,
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
