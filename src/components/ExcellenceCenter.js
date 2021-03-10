import React, {useEffect, useState} from "react";
import LabelSelect from "./LabelSelect";
import ExcellenceCenterTable from "./ExcellenceCenterTable";
import {fetchCeDatas, fetchYearsDatas, fetchProjectsTypeDatas} from "../API";


const ExcellenceCenter = () => {

    const todayDate = new Date()
    const todayYear = todayDate.getFullYear().toString()

    const [years, setYears] = useState([])
    const [selectedYear, setSelectedYear] = useState(years.length>0 ? years[0].key : todayYear);

    const [ce, setCe] = useState([])
    const [selectedCE, setSelectedCE] = useState(ce.length>0 ? ce[0].key : 'all');

    const [projectsType, setProjectsType] = useState([])
    const [selectedProjectType, setSelectedProjectType] = useState(projectsType.length>0 ? projectsType[0].key : 'all');

    useEffect(() => {

        const getYears = async () => {
            const yearsTable = await fetchYearsDatas()
            setYears(yearsTable)
        }
        getYears()

    }, [])


    useEffect(() => {

        const getCe = async () => {
            const ceTable = await fetchCeDatas()
            setCe(ceTable)
        }
        getCe()

    }, [])

    useEffect(() => {

        const getProjectsType = async () => {
            const ProjectsTypeTable = await fetchProjectsTypeDatas()
            setProjectsType(ProjectsTypeTable)
        }
        getProjectsType()

    }, [])


    const handleButtonChangeCE = (e) => {
        setSelectedCE(e.target.value);
    }

    const handleButtonChangeYear = (e) => {
        setSelectedYear(e.target.value);
    }

    const handleButtonChangeProjectType = (e) => {
        setSelectedProjectType(e.target.value);
    }

    return (
        <div className="excellence-center">
            <h2>Business Intelligency - CE</h2>
            <LabelSelect label="Choix du centre d'excellence" options={ce} id="excellence-center-choice" onChange={handleButtonChangeCE}/>
            <LabelSelect label="Année" options={years} id="year" onChange={handleButtonChangeYear}/>
            <LabelSelect label="Type de projet" options={projectsType} id="projects-type" onChange={handleButtonChangeProjectType}/>
            <ExcellenceCenterTable ce={selectedCE} year={selectedYear} projectType={selectedProjectType}/>
        </div>
    );
}

export default ExcellenceCenter