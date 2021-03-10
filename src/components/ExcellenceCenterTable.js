import React, {useEffect, useState} from "react";
import {fetchCEData} from "../API";

const ExcellenceCenterTable = ({ce, projectType, year}) => {

    const indicators =  ["CA", "TJM", "# Jours dispo",  "# Jours prod", "# Jours interP", "TO"]

    const [data, setData] = useState(null)

    useEffect(() => {

        const setCEData = async () => {
            setData((await fetchCEData({ce, year, projectType})))
        }
        setCEData()


    }, [ce, projectType, year])
    const months = data && Object.keys(data)


    let casComputed =[]
    if(months && data) {
           casComputed = months
             .map(month => data[month].CA)
             .reduce((acc, currentCA, index) => {
                 if (index === 0) {
                     acc.push(currentCA)
                     return acc;
                 }
                 acc.push(currentCA + acc[index - 1])
                 return acc;
             }, [])
    }


    let tjmComputed =[]
    if(months && data) {
        tjmComputed = months
            .map(month => data[month].TJM)
            .reduce((acc, currentTJM, index) => {
                if (index === 0) {
                    acc.push(currentTJM)
                    return acc;
                }
                acc.push(currentTJM + acc[index - 1])
                return acc;
            }, [])
    }

    let availableDaysComputed =[]
    if(months && data) {
        availableDaysComputed = months
            .map(month => data[month].availableDays)
            .reduce((acc, currentAvailableDays, index) => {
                if (index === 0) {
                    acc.push(currentAvailableDays)
                    return acc;
                }
                acc.push(currentAvailableDays + acc[index - 1])
                return acc;
            }, [])
    }

    let productionDaysComputed =[]
    if(months && data) {
        productionDaysComputed = months
            .map(month => data[month].productionDays)
            .reduce((acc, currentProductionDays, index) => {
                if (index === 0) {
                    acc.push(currentProductionDays)
                    return acc;
                }
                acc.push(currentProductionDays + acc[index - 1])
                return acc;
            }, [])
    }

    let interProductionDaysComputed =[]
    if(months && data) {
        interProductionDaysComputed = months
            .map(month => data[month].interProductionDays)
            .reduce((acc, currentInterProductionDays, index) => {
                if (index === 0) {
                    acc.push(currentInterProductionDays)
                    return acc;
                }
                acc.push(currentInterProductionDays + acc[index - 1])
                return acc;
            }, [])
    }

    let toComputed =[]
    if(months && data) {
        toComputed = months
            .map(month => data[month].TO)
            .reduce((acc, currentTO, index) => {
                if (index === 0) {
                    acc.push(currentTO)
                    return acc;
                }
                acc.push(currentTO + acc[index - 1])
                return acc;
            }, [])
    }

    // refactorer les constantes xxxComputed dans une fonction
    // remplacer les * dans le tableau par le calcul du total.

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
                        {indicators.map((item, index) =>
                            <th key={index} >{item}</th>)}
                        {indicators.map((item, index) =>
                            <th key={index} >{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data && months && months.map((month, index) =>
                        <tr key={index}>
                            <td key={index}>{month}</td>
                            <td>{data[month].CA}</td>
                            <td>{data[month].TJM}</td>
                            <td>{data[month].availableDays}</td>
                            <td>{data[month].productionDays}</td>
                            <td>{data[month].interProductionDays}</td>
                            <td>{data[month].TO}</td>

                            <td>{casComputed[index]}</td>
                            <td>{tjmComputed[index]}</td>
                            <td>{availableDaysComputed[index]}</td>
                            <td>{productionDaysComputed[index]}</td>
                            <td>{interProductionDaysComputed[index]}</td>
                            <td>{parseInt(toComputed[index]/(index+1))}</td>
                        </tr>)}
                        <tr>
                            <td>Total annuel</td>
                            <td>*</td>
                            <td></td>
                            <td>*</td>
                            <td>*</td>
                            <td>*</td>
                        </tr>
                </tbody>
            </table>
        </>
    )
}


export default ExcellenceCenterTable