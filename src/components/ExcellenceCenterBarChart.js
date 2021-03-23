import React from "react";
import {Bar, defaults} from "react-chartjs-2"
import 'chartjs-plugin-datalabels';

defaults.global.tooltips.enabled = false
//defaults.options.animation = false

const ExcellenceCenterBarChart = () => {

    let dataCumulCA = [107000, 127000, 142000, 152000, 167000, 187000, 202000, 212000, 227000, 247000, 262000, 272000]
    let dataCA = [107000, 20000, 15000, 10000, 15000, 20000, 15000, 10000, 15000, 20000, 15000, 10000]

    // ajouter un useState pour avoir le set de la métrique (métrique par défaut, ce sera CA)
    // Ajouter un useEffect pour modifier la valeur avec ce qui vient de l'API

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
                        //backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#A50040',
                        type: 'line',
                        fill: false
                    },
                    {
                        label: 'Valeurs mensuelles (€)',
                        data: dataCA,
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