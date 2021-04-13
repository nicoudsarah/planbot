import React, {useEffect, useState} from "react";
import FilterSelector from "./FilterSelector";
import ExcellenceCenterTable from "./ExcellenceCenterTable";
import ExcellenceCenterBarChart from "./ExcellenceCenterBarChart";
import {fetchExcellenceCenters, fetchYears, fetchProjectTypes, fetchProductionMetricsLabel} from "../API";
import "./ExcellenceCenter.scss";

const ExcellenceCenter = () => {

    const todayDate = new Date()
    const todayYear = todayDate.getFullYear().toString()

    const [years, setYears] = useState([])
    const [currentYear, changeYear] = useState(years.length > 0 ? years[0].key : todayYear)

    const [excellenceCentersFilters, setExcellenceCentersFilters] = useState([])
    const [currentExcellenceCentersFilter, changeExcellenceCentersFilter] = useState(excellenceCentersFilters.length > 0 ? excellenceCentersFilters[0].key : 'all')

    const [projectTypesFilters, setProjectsTypesFilters] = useState([])
    const [currentProjectTypesFilter, changeProjectTypesFilter] = useState(projectTypesFilters.length > 0 ? projectTypesFilters[0].key : 'all')

    const [productionMetric, setProductionMetric] = useState([])
    const [currentProductionMetric, changeProductionMetric] = useState(productionMetric.length > 0 ? productionMetric[0].key : "CA")

    const [spinner, setSpinner] = useState(true)


    useEffect(() => {
        const fetchFilterSelectorComponentData = async () => {
            setSpinner(true)

            const [years, excellenceCenter, projectTypes, productionMetricLabel] = await Promise.all(
                [fetchYears(),
                fetchExcellenceCenters(),
                fetchProjectTypes(),
                fetchProductionMetricsLabel()]
            )
            setYears(years)
            setExcellenceCentersFilters(excellenceCenter)
            setProjectsTypesFilters(projectTypes)
            setProductionMetric(productionMetricLabel)

            setSpinner(false)
        }
        fetchFilterSelectorComponentData()

    }, [])


    const handleExcellenceCentersFilterChange = (e) => {
        changeExcellenceCentersFilter(e.target.value)
    }

    const handleYearChange = (e) => {
        changeYear(e.target.value)
    }

    const handleProjectTypesFilterChange = (e) => {
        changeProjectTypesFilter(e.target.value)
    }

    const handleProductionMetricFilterChange = (e) => {
        changeProductionMetric(e.target.value)
    }

    return spinner ? <div>
        <div className="loader"></div>
        <div className="loader-text">Chargement de la BI ...</div>
    </div> : (
        <div className="excellence-center">
            <h2 className="excellence-center__title">Business Intelligency - CE</h2>
            <div className="excellence-center__buttons">
                <div className="excellence-center__button-item">
                    <FilterSelector label="Choix du centre d'excellence" options={excellenceCentersFilters}
                                    id="excellence-center-choice" onChange={handleExcellenceCentersFilterChange}/>
                </div>
                <div className="excellence-center__button-item">
                    <FilterSelector label="Année" options={years} id="year" onChange={handleYearChange}/>
                </div>
                <div className="excellence-center__button-item">
                    <FilterSelector label="Type de projet" options={projectTypesFilters} id="projects-type"
                                    onChange={handleProjectTypesFilterChange}/>
                </div>
            </div>
            <br/>
            <br/>
            <ExcellenceCenterTable className="excellence-center__table"
                                   excellenceCenter={currentExcellenceCentersFilter} year={currentYear}
                                   projectType={currentProjectTypesFilter}/>
            <br/>
            <br/>
            <div className="excellence-center__button-item">
                <FilterSelector label="Métrique de production globale sur l'année en cours" options={productionMetric} id="productionMetric"
                                onChange={handleProductionMetricFilterChange}/>
            </div>
            <br/>
            <br/>
            <ExcellenceCenterBarChart productionMetricsLabel={currentProductionMetric}/>
            <div className="legend">* Cliquer pour faire disparaître/apparaître le jeu de données</div>
        </div>
    )
}

export default ExcellenceCenter