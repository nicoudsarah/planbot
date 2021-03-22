import React, {useEffect, useState} from "react";
import LabelSelect from "./LabelSelect";
import ExcellenceCenterTable from "./ExcellenceCenterTable";
import {fetchExcellenceCenters, fetchYears, fetchProjectTypes} from "../API";
import "./ExcellenceCenter.scss";

const ExcellenceCenter = () => {

    const todayDate = new Date()
    const todayYear = todayDate.getFullYear().toString()

    const [years, setYears] = useState([])
    const [currentYear, changeYear] = useState(years.length>0 ? years[0].key : todayYear);

    const [excellenceCentersFilters, setExcellenceCentersFilters] = useState([])
    const [currentExcellenceCentersFilter, changeExcellenceCentersFilter] = useState(excellenceCentersFilters.length>0 ? excellenceCentersFilters[0].key : 'all');

    const [projectTypesFilters, setProjectsTypesFilters] = useState([])
    const [currentProjectTypesFilter, changeProjectTypesFilter] = useState(projectTypesFilters.length>0 ? projectTypesFilters[0].key : 'all');

    useEffect( () => {

        const getYears = async () => {
            const years = await fetchYears()
            setYears(years)
        }
        getYears()

    }, [])


    useEffect(() => {

        const getExcellenceCenters = async () => {
            const ExcellenceCenters = await fetchExcellenceCenters()
            setExcellenceCentersFilters(ExcellenceCenters)
        }
        getExcellenceCenters()

    }, [])

    useEffect(() => {

        const getProjectTypes = async () => {
            const ProjectTypes = await fetchProjectTypes()
            setProjectsTypesFilters(ProjectTypes)
        }
        getProjectTypes()

    }, [])


    const handleExcellenceCentersFilterChange = (e) => {
        changeExcellenceCentersFilter(e.target.value);
    }

    const handleYearChange = (e) => {
        changeYear(e.target.value);
    }

    const handleProjectTypesFilterChange = (e) => {
        changeProjectTypesFilter(e.target.value);
    }

    return (
        <div className="excellence-center">
            <h2 className="excellence-center__title">Business Intelligency - CE</h2>
            <div className="excellence-center__buttons">
                <div className="excellence-center__button-item">
                    <LabelSelect label="Choix du centre d'excellence" options={excellenceCentersFilters} id="excellence-center-choice" onChange={handleExcellenceCentersFilterChange}/>
                </div>
                <div className="excellence-center__button-item">
                    <LabelSelect label="Année" options={years} id="year" onChange={handleYearChange}/>
                </div>
                <div className="excellence-center__button-item">
                    <LabelSelect label="Type de projet" options={projectTypesFilters} id="projects-type" onChange={handleProjectTypesFilterChange}/>
                </div>
            </div>
            <br/>
            <br/>
            <ExcellenceCenterTable className="excellence-center__table" ce={currentExcellenceCentersFilter} year={currentYear} projectType={currentProjectTypesFilter}/>
        </div>
    );
}

export default ExcellenceCenter