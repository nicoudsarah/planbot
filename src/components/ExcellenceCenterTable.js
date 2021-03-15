import React, {useEffect, useState} from "react";
import {fetchCEData} from "../API";
import "./ExcellenceCenterTable.scss";

const ExcellenceCenterTable = ({ce, projectType, year}) => {

    const indicators =  ["CA", "TJM", "# Jours dispo",  "# Jours prod", "# Jours interP", "TO"]
    const JSONindicators =  ["CA", "TJM", "availableDays",  "productionDays", "interProductionDays", "TO"]

    const [data, setData] = useState(null)

    useEffect(() => {

        const setCEData = async () => {
            setData((await fetchCEData({ce, year, projectType})))
        }
        setCEData()


    }, [ce, projectType, year])
    const months = data && Object.keys(data)

    const calculateAnnualDateValueForIndicator = (indicator) => {
        let computedValuesTable = []
        if (months && data) {
            computedValuesTable = months
                .map(month => data[month][indicator])
                .reduce((acc, currentValue, index) => {
                    if (index === 0) {
                        acc.push(currentValue)
                        return acc;
                    }
                    acc.push(currentValue + acc[index - 1])
                    return acc;
                }, [])
        }
        return computedValuesTable
    }

    const calculateActualTotalValueForIndicator = (indicator) => {
        if (months && data) {
            const computedValuesTable = calculateAnnualDateValueForIndicator(indicator)
            const actualTotal = computedValuesTable[computedValuesTable.length - 1]
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
                        {indicators.map((item, index) =>
                            <th key={index} id="month-cell-item">{item}</th>)}
                        {indicators.map((item, index) =>
                            <th key={index} >{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data && months && months.map((month, index) =>
                        <tr key={index} className="ExcellenceCenterTable__row">
                            <td key={index} className="ExcellenceCenterTable__row-item">{month}</td>
                            <td className="ExcellenceCenterTable__row-item__CA">{data[month].CA}</td>
                            <td className="ExcellenceCenterTable__row-item">{data[month].TJM}</td>
                            <td className="ExcellenceCenterTable__row-item">{data[month].availableDays}</td>
                            <td className="ExcellenceCenterTable__row-item">{data[month].productionDays}</td>
                            <td className="ExcellenceCenterTable__row-item">{data[month].interProductionDays}</td>
                            <td className="ExcellenceCenterTable__row-item">{data[month].TO}</td>

                            <td className="ExcellenceCenterTable__row-item__CA">{calculateAnnualDateValueForIndicator(JSONindicators[0])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{calculateAnnualDateValueForIndicator(JSONindicators[1])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{calculateAnnualDateValueForIndicator(JSONindicators[2])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{calculateAnnualDateValueForIndicator(JSONindicators[3])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{calculateAnnualDateValueForIndicator(JSONindicators[4])[index]}</td>
                            <td className="ExcellenceCenterTable__row-item">{parseInt(calculateAnnualDateValueForIndicator(JSONindicators[5])[index]/(index+1))}</td>
                        </tr>)}
                        <tr>
                            <td className="ExcellenceCenterTable__row-total-item">Total annuel</td>
                            <td className="ExcellenceCenterTable__row-total-item__CA">{calculateActualTotalValueForIndicator(JSONindicators[0])}</td>
                            <td></td>
                            <td className="ExcellenceCenterTable__row-total-item">{calculateActualTotalValueForIndicator(JSONindicators[2])}</td>
                            <td className="ExcellenceCenterTable__row-total-item">{calculateActualTotalValueForIndicator(JSONindicators[3])}</td>
                            <td className="ExcellenceCenterTable__row-total-item">{calculateActualTotalValueForIndicator(JSONindicators[4])}</td>
                        </tr>
                </tbody>
            </table>
        </>
    )
}


export default ExcellenceCenterTable