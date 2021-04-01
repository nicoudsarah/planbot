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



    const computeSum = (data) => {
        return data.reduce((a, b) => a + b, 0);
    }

    const computeAverage = (data) => {
        return computeSum(data) / data.length;
    }



    const averages = [];
    const sums = [];


   /* if (months && monthlyProductionMetrics) {
        months.forEach((month, index) => {
            const data = getProductionMetricsValuesFromJson("TJM").slice(0, index + 1);
            const average = computeAverage(data);
            const sum = computeSum(data);
            averages.push(average);
            sums.push(sum);
        });
    }*/

    /*const dataToDisplay = () => {
        return data.map(data => {
            data.toFixed(2);
        })
    }*/
    //console.log('average : ' +averages)
    //console.log('sum : ' + sums)

    /** La bonne version !!!!*/

    const getProductionMetricsValuesFromJson = (productionMetricsLabel) => {
        return months.map(month => monthlyProductionMetrics[month][productionMetricsLabel]);
    }

    const calculateValuesToDisplayForProductionMetricsFromJson = (ProductionMetricsLabel) => {       // on pourra remplacer label par CA, TJM, jour...
        if (months && monthlyProductionMetrics) {

            return DataProcessing.calculateValueToDisplayForProductionMetrics(months, getProductionMetricsValuesFromJson(ProductionMetricsLabel), "CA")

        }
    }

    const data = calculateValuesToDisplayForProductionMetricsFromJson("CA")
    console.log(data)







    /*  const calculateAnnualDateValueForProductionMetrics = (ProductionMetricsLabel) => {
          let computedValues = []

          if (months && monthlyProductionMetrics) {
              if (productionMetricsLabel != "TO" && productionMetricsLabel != "TJM") {
                  computedValues = months
                      .map(month => monthlyProductionMetrics[month][productionMetricsLabel])
                      .reduce((acc, currentValue, index) => {
                          if (index === 0) {
                              acc.push(currentValue)
                              return acc;
                          }
                          acc.push(currentValue + acc[index - 1])
                          return acc;
                      }, [])
              } else if (productionMetricsLabel == "TJM") {
                  let sumTJMValues = []
                  computedValues = months
                      .map(month => monthlyProductionMetrics[month][productionMetricsLabel])
                      .reduce((moyTJMValues, currentValue, index) => {
                          if (index === 0) {
                              moyTJMValues.push(currentValue)
                              sumTJMValues.push(currentValue)
                              return moyTJMValues;
                          }
                          sumTJMValues.push(currentValue + sumTJMValues[index - 1])

                          moyTJMValues.push((sumTJMValues[index] / (index + 1)).toFixed(2))
                          return moyTJMValues;
                      }, [])
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
      }

      console.log(calculateAnnualDateValueForProductionMetrics("TJM"))
      let cumulatedProductionMetricsValues = calculateAnnualDateValueForProductionMetrics(productionMetricsLabel)

      const TJM = [{prod: 20}, {prod: 40}, {prod: 60}, {prod: 80}]


      //Si on a TO, il faut prendre le tableau des valeurs cumulées des jours produits et des jours dispos et pour chaque valeur faire: jour produit/jour dispo x100
      let sumValues = []
      let computedValues1 = TJM
          .map(TJM => TJM.prod)
          .reduce((moyValues, currentValue, index) => {
              if (index === 0) {
                  moyValues.push(currentValue)
                  sumValues.push(currentValue)
                  return moyValues;
              }

              sumValues.push(currentValue + sumValues[index - 1])

              moyValues.push(sumValues[index] / (index + 1))

              //console.log('tableau somme des valeurs : ' + sumValues)
              //console.log('tableau moy des valeurs : ' + moyValues)
              return moyValues;
          }, [])*/


    //console.log('test : ' + computedValues1)


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
