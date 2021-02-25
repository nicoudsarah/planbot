import React from "react";
import PropTypes from 'prop-types';

const CeTable = (props) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td colSpan="6" id="monthly-values">Valeurs mensuelles</td>
                        <td colSpan="6" id="annual-values">Valeurs annuelles à date</td>
                    </tr>
                    <tr>
                        <td id="month-cell">Mois</td>
                        {props.gestionDatas && props.gestionDatas.map((item, index) =>
                            <td key={index} id={"monthly-" + item.name}>{item.indicator}</td>)}
                        {props.gestionDatas && props.gestionDatas.map((item, index) =>
                            <td key={index} id={"annual-" + item.name}>{item.indicator}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {props.calender && props.calender.map((item, index) =>
                        <tr key={index} id={item.id}>
                            <td key={index} id={item.id + "-cell"}>{item.month}</td>
                        </tr>)}
                </tbody>
            </table>
        </>
    )
}

CeTable.propTypes = {
    gestionDatas: PropTypes.array.isRequired,
    calender: PropTypes.array.isRequired
    // est-ce que j'ai besoin de spécifier que l'id et le month de calender sont obligatoire ? Pareil pour le name et l'indicator de gestionDatas ?
}

export default CeTable