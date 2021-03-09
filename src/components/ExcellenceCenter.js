import React, {useEffect, useState} from "react";
import LabelSelect from "./LabelSelect";
import ExcellenceCenterTable from "./ExcellenceCenterTable";
import {ceDatas, yearsDatas, projectsTypeDatas} from "../API";


const ExcellenceCenter = () => {

    //const ce = [{key: "all", value: "Tous"}, {key: "lyon", value: "Lyon"}, {key: "grenoble", value:"Grenoble"}]
    //const years = [{key: "2021", value:"2021"}, {key: "2020", value: "2020"}]
    //const projectsType = [{key: "all", value: "Tous"}, {key: "dev", value: "Dev"}, {key: "ergo", value:"Ergo"}]

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
            const yearsTable = await yearsDatas()
            setYears(yearsTable)
        }
        getYears()

    }, [])


    useEffect(() => {

        const getCe = async () => {
            const ceTable = await ceDatas()
            setCe(ceTable)
        }
        getCe()

    }, [])

    useEffect(() => {

        const getProjectsType = async () => {
            const ProjectsTypeTable = await projectsTypeDatas()
            setProjectsType(ProjectsTypeTable)
        }
        getProjectsType()

    }, [])

    // Avec l'utilisation de then, on attend que yearsData soit effectuée complètement avant de récupérer la réponse et de setter la valeurs de years avec les valeurs de la réponse
    // L'utilissation d'une fonction asynchrone et donc du .then, veut dire qu'on a un effet de bord. Avec .then, on peut le gérer, mais ce n'est pas la meilleur solution. Le mieux est d'utiliser un useEffect qui gère bien mieux les effets de bords
    // yearsDatas().then((response) => {
    //     setYears(response)
    //     console.log(response)
    // })


    const buttonChangeCE = (e) => {
        setSelectedCE(e.target.value);
    }

    const buttonChangeYear = (e) => {
        setSelectedYear(e.target.value);
    }

    const buttonChangeProjectType = (e) => {
        setSelectedProjectType(e.target.value);
    }

    return (
        <div className="excellence-center">
            <h2>Business Intelligency - CE</h2>
            <LabelSelect label="Choix du centre d'excellence" options={ce} id="excellence-center-choice" onChange={buttonChangeCE}/>
            <LabelSelect label="Année" options={years} id="year" onChange={buttonChangeYear}/>
            <LabelSelect label="Type de projet" options={projectsType} id="projects-type" onChange={buttonChangeProjectType}/>
            <ExcellenceCenterTable ce={selectedCE} year={selectedYear} projectType={selectedProjectType}/>
        </div>
    );
}

export default ExcellenceCenter