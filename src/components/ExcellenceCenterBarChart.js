
import React, {useEffect, useState} from "react";
import {Bar, defaults} from "react-chartjs-2"
import 'chartjs-plugin-datalabels';
import {fetchProductionMetrics} from "../API";

defaults.global.tooltips.enabled = false


const ExcellenceCenterBarChart = ({productionMetricsLabel}) => {

    let dataCumulCA = [107000, 127000, 142000, 152000, 167000, 187000, 202000, 212000, 227000, 247000, 262000, 272000]

    const [monthlyProductionMetrics, changeProductionMetricsForEachMonth] = useState(null)

    useEffect(() => {

        const setProductionMetricsWithFilters = async () => {
            changeProductionMetricsForEachMonth(await fetchProductionMetrics())
        }
        setProductionMetricsWithFilters()

    }, [])
    const months = monthlyProductionMetrics && Object.keys(monthlyProductionMetrics)

    const extractProductionMetricsValues = (productionMetricsLabel) => {
        let ProductionMetricValues = []
        if (months && monthlyProductionMetrics) {
            ProductionMetricValues = months.map((month) => { return monthlyProductionMetrics[month][productionMetricsLabel]})
        }
        return ProductionMetricValues
    }

    let productionMetricsValues = extractProductionMetricsValues(productionMetricsLabel)
    

    return <div>
        <Bar
            data ={{
                labels: ['Janv', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Cumul annuel à date (€)',
                        data: dataCumulCA,
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
                        data: productionMetricsValues,
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