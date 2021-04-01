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


    /** La bonne version !!!!*/

    const getProductionMetricsValuesFromJson = (productionMetricsLabel) => {
        return months.map(month => monthlyProductionMetrics[month][productionMetricsLabel]);
    }

    const calculateValuesToDisplayForProductionMetricsFromJson = (ProductionMetricsLabel) => {       // on pourra remplacer label par CA, TJM, jour...
        if (months && monthlyProductionMetrics) {
            return DataProcessing.calculateValueToDisplayForProductionMetrics(months, getProductionMetricsValuesFromJson(ProductionMetricsLabel), "TJM")
        }
    }

    const data = calculateValuesToDisplayForProductionMetricsFromJson("TJM")
    //console.log(data)



    /*  const calculateAnnualDateValueForProductionMetrics = (ProductionMetricsLabel) => {
          let computedValues = []
              } else {
                  let productionDayValues = []
                  let availablDaysValue = []
                  productionDayValues = months
                      .map(month => monthlyProductionMetrics[month]["productionDays"])
                      .reduce((acc, currentValue, index) => {
                          if (index === 0) {
                              acc.push(currentValue)
                              return acc;
                          }
                          acc.push(currentValue + acc[index - 1])
                          return acc;
                      }, [])
                  availablDaysValue = months
                      .map(month => monthlyProductionMetrics[month]["availableDays"])
                      .reduce((acc, currentValue, index) => {
                          if (index === 0) {
                              acc.push(currentValue)
                              return acc;
                          }
                          acc.push(currentValue + acc[index - 1])
                          return acc;
                      }, [])
                  for (var i = 0; i < productionDayValues.length; i++) {
                      let fixedComputed = null
                      fixedComputed = ((productionDayValues[i] / availablDaysValue[i]) * 100).toFixed(2)
                      computedValues.push(fixedComputed)
                  }
              }
          }
          return computedValues
      }*/


    return <div>
        <Bar
            data={{
                labels: ['Janv', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Cumul annuel à date (€)',
                        data: data,
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
