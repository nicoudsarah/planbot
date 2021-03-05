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
                        </tr>)}
                </tbody>
            </table>
        </>
    )
}


export default ExcellenceCenterTable