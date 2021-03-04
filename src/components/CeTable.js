import React, {useEffect, useState} from "react";
import Json_CE_All_YEAR_2021_PROJ_Dev from "../CE_All_YEAR_2021_PROJ_Dev.json";
import Json_CE_All_YEAR_2021_PROJ_Ergo from "../CE_All_YEAR_2021_PROJ_Ergo.json";
import Json_CE_All_YEAR_2021_PROJ_All from "../CE_All_YEAR_2021_PROJ_All.json";
import Json_CE_All_YEAR_2020_PROJ_Dev from "../CE_All_YEAR_2020_PROJ_Dev.json";
import Json_CE_All_YEAR_2020_PROJ_Ergo from "../CE_All_YEAR_2020_PROJ_Ergo.json";
import Json_CE_All_YEAR_2020_PROJ_All from "../CE_All_YEAR_2020_PROJ_All.json";
import Json_CE_Grenoble_YEAR_2021_PROJ_Dev from "../CE_Grenoble_YEAR_2021_PROJ_Dev.json"
import Json_CE_Grenoble_YEAR_2021_PROJ_Ergo from "../CE_Grenoble_YEAR_2021_PROJ_Ergo.json"
import Json_CE_Grenoble_YEAR_2021_PROJ_All from "../CE_Grenoble_YEAR_2021_PROJ_All.json"
import Json_CE_Grenoble_YEAR_2020_PROJ_Dev from "../CE_Grenoble_YEAR_2020_PROJ_Dev.json"
import Json_CE_Grenoble_YEAR_2020_PROJ_Ergo from "../CE_Grenoble_YEAR_2020_PROJ_Ergo.json"
import Json_CE_Grenoble_YEAR_2020_PROJ_All from "../CE_Grenoble_YEAR_2020_PROJ_All.json"
import Json_CE_Lyon_YEAR_2021_PROJ_Dev from "../CE_Lyon_YEAR_2021_PROJ_Dev.json"
import Json_CE_Lyon_YEAR_2021_PROJ_Ergo from "../CE_Lyon_YEAR_2021_PROJ_Ergo.json"
import Json_CE_Lyon_YEAR_2021_PROJ_All from "../CE_Lyon_YEAR_2021_PROJ_All.json"
import Json_CE_Lyon_YEAR_2020_PROJ_Dev from "../CE_Lyon_YEAR_2020_PROJ_Dev.json"
import Json_CE_Lyon_YEAR_2020_PROJ_Ergo from "../CE_Lyon_YEAR_2020_PROJ_Ergo.json"
import Json_CE_Lyon_YEAR_2020_PROJ_All from "../CE_Lyon_YEAR_2020_PROJ_All.json"

const CeTable = ({ce, projectType, year}) => {

    const indicators =  ["CA", "TJM", "# Jours dispo",  "# Jours prod", "# Jours interP", "TO"]

    const [data, setData] = useState(null)

    useEffect(() => {
        /* Pour Ruby
        const JSONRecup = async () => {
            const response = await fetch(data,{
                headers : {
                    'Content-Type': 'application/json',
                        'Accept': 'application/json'
                }
            })
            console.log(response)
        }
        JSONRecup()*/
        if( ce === "all" && year === "2021" && projectType === "dev" ) {
            setData(Json_CE_All_YEAR_2021_PROJ_Dev)
        } else if (ce === "all" && year === "2021" && projectType === "ergo" ) {
            setData(Json_CE_All_YEAR_2021_PROJ_Ergo)
        } else if (ce === "all" && year === "2021" && projectType === "all" ) {
            setData(Json_CE_All_YEAR_2021_PROJ_All)
        } else if (ce === "all" && year === "2020" && projectType === "dev" ) {
            setData(Json_CE_All_YEAR_2020_PROJ_Dev)
        } else if (ce === "all" && year === "2020" && projectType === "ergo" ) {
            setData(Json_CE_All_YEAR_2020_PROJ_Ergo)
        } else if (ce === "all" && year === "2020" && projectType === "all" ) {
            setData(Json_CE_All_YEAR_2020_PROJ_All)
        } else if (ce === "grenoble" && year === "2021" && projectType === "dev" ) {
            setData(Json_CE_Grenoble_YEAR_2021_PROJ_Dev)
        } else if (ce === "grenoble" && year === "2021" && projectType === "ergo" ) {
            setData(Json_CE_Grenoble_YEAR_2021_PROJ_Ergo)
        } else if (ce === "grenoble" && year === "2021" && projectType === "all" ) {
            setData(Json_CE_Grenoble_YEAR_2021_PROJ_All)
        } else if (ce === "grenoble" && year === "2020" && projectType === "dev" ) {
            setData(Json_CE_Grenoble_YEAR_2020_PROJ_Dev)
        } else if (ce === "grenoble" && year === "2020" && projectType === "ergo" ) {
            setData(Json_CE_Grenoble_YEAR_2020_PROJ_Ergo)
        } else if (ce === "grenoble" && year === "2020" && projectType === "all" ) {
            setData(Json_CE_Grenoble_YEAR_2020_PROJ_All)
        } else if (ce === "lyon" && year === "2021" && projectType === "dev" ) {
            setData(Json_CE_Lyon_YEAR_2021_PROJ_Dev)
        }  else if (ce === "lyon" && year === "2021" && projectType === "ergo" ) {
            setData(Json_CE_Lyon_YEAR_2021_PROJ_Ergo)
        }else if (ce === "lyon" && year === "2021" && projectType === "all" ) {
            setData(Json_CE_Lyon_YEAR_2021_PROJ_All)
        } else if (ce === "lyon" && year === "2020" && projectType === "dev" ) {
            setData(Json_CE_Lyon_YEAR_2020_PROJ_Dev)
        } else if (ce === "lyon" && year === "2020" && projectType === "ergo" ) {
            setData(Json_CE_Lyon_YEAR_2020_PROJ_Ergo)
        } else if (ce === "lyon" && year === "2020" && projectType === "all" ) {
            setData(Json_CE_Lyon_YEAR_2020_PROJ_All)
        }

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


export default CeTable