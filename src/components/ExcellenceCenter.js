import LabelSelect from "./LabelSelect";
import CeTable from "./CeTable";

const ExcellenceCenter = () => {
    const ce = [{key: "all", value: "Tous"}, {key: "lyon", value: "Lyon"}, {key: "grenoble", value:"Grenoble"}]
    const years = [{key: "2019", value: "2019"}, {key: "2020", value: "2020"}, {key: "2021", value:"2021"}]
    const projectsType = [{key: "all", value: "Tous"}, {key: "dev", value: "Dev"}, {key: "ergo", value:"Ergo"}]

    return (
        <div className="excellence-center">
            <h2>Business Intelligency - CE</h2>
            <LabelSelect label="Choix du centre d'excellence" options={ce} id="excellence-center-choice"/>
            <LabelSelect label="Année" options={years} id="year"/>
            <LabelSelect label="Type de projet" options={projectsType} id="projects-type"/>
            <CeTable ce={"lyon"} year={"2020"} projectType={"dev"}/>
        </div>
    );
}

export default ExcellenceCenter