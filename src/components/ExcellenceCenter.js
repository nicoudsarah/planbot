import React, {useEffect, useState} from "react";
import LabelSelect from "./LabelSelect";
import ExcellenceCenterTable from "./ExcellenceCenterTable";

const ExcellenceCenter = () => {
    const ce = [{key: "all", value: "Tous"}, {key: "lyon", value: "Lyon"}, {key: "grenoble", value:"Grenoble"}]
    const years = [{key: "2021", value:"2021"}, {key: "2020", value: "2020"}]
    const projectsType = [{key: "all", value: "Tous"}, {key: "dev", value: "Dev"}, {key: "ergo", value:"Ergo"}]

    const [selectedCE, setSelectedCE] = useState(ce[0].key);
    const [selectedYear, setSelectedYear] = useState(years[0].key);
    const [selectedProjectType, setSelectedProjectType] = useState(projectsType[0].key);

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