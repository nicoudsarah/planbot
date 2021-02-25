import LabelSelect from "./LabelSelect";
import CeTable from "./CeTable";

const ExcellenceCenter = () => {
    const ce = [{key: "all", value: "Tous"}, {key: "lyon", value: "Lyon"}, {key: "grenoble", value:"Grenoble"}]
    const years = [{key: "2019", value: "2019"}, {key: "2020", value: "2020"}, {key: "2021", value:"2021"}]
    const projectsType = [{key: "all", value: "Tous"}, {key: "dev", value: "Dev"}, {key: "ergo", value:"Ergo"}]
    const months = [{month: "Janvier", id: "january"}, {month: "Février", id: "february"}, {month: "Mars", id: "march"},
        {month: "Avril", id: "april"}, {month: "Mai", id: "may"}, {month: "Juin", id: "june"},
        {month: "Juillet", id: "july"}, {month: "août", id: "august"}, {month: "Septembre", id: "september"},
        {month: "Octobre", id: "october"}, {month: "Novembre", id: "november"}, {month: "Décembre", id: "december"}]
    const indicators =  [{indicator: "CA", name: "ca"}, {indicator: "TJM", name: "tjm"},
                        {indicator: "# Jours dispo", name: "availability-days"}, {indicator: "# Jours prod", name: "production-days"},
                        {indicator: "# Jours interP", name: "inter-contract-days"}, {indicator: "TO", name: "to"}]

    return (
        <div className="excellence-center">
            <h2>Business Intelligency - CE</h2>
            <LabelSelect label="Choix du centre d'excellence" options={ce} id="excellence-center-choice"/>
            <LabelSelect label="Année" options={years} id="year"/>
            <LabelSelect label="Type de projet" options={projectsType} id="projects-type"/>
            <CeTable calender={months} gestionDatas={indicators}/>
        </div>
    );
}

export default ExcellenceCenter