import Json_CE_All_YEAR_2021_PROJ_Dev from "./CE_All_YEAR_2021_PROJ_Dev.json";
import Json_CE_All_YEAR_2021_PROJ_Ergo from "./CE_All_YEAR_2021_PROJ_Ergo.json";
import Json_CE_All_YEAR_2021_PROJ_All from "./CE_All_YEAR_2021_PROJ_All.json";
import Json_CE_All_YEAR_2020_PROJ_Dev from "./CE_All_YEAR_2020_PROJ_Dev.json";
import Json_CE_All_YEAR_2020_PROJ_Ergo from "./CE_All_YEAR_2020_PROJ_Ergo.json";
import Json_CE_All_YEAR_2020_PROJ_All from "./CE_All_YEAR_2020_PROJ_All.json";
import Json_CE_Grenoble_YEAR_2021_PROJ_Dev from "./CE_Grenoble_YEAR_2021_PROJ_Dev.json";
import Json_CE_Grenoble_YEAR_2021_PROJ_Ergo from "./CE_Grenoble_YEAR_2021_PROJ_Ergo.json";
import Json_CE_Grenoble_YEAR_2021_PROJ_All from "./CE_Grenoble_YEAR_2021_PROJ_All.json";
import Json_CE_Grenoble_YEAR_2020_PROJ_Dev from "./CE_Grenoble_YEAR_2020_PROJ_Dev.json";
import Json_CE_Grenoble_YEAR_2020_PROJ_Ergo from "./CE_Grenoble_YEAR_2020_PROJ_Ergo.json";
import Json_CE_Grenoble_YEAR_2020_PROJ_All from "./CE_Grenoble_YEAR_2020_PROJ_All.json";
import Json_CE_Lyon_YEAR_2021_PROJ_Dev from "./CE_Lyon_YEAR_2021_PROJ_Dev.json";
import Json_CE_Lyon_YEAR_2021_PROJ_Ergo from "./CE_Lyon_YEAR_2021_PROJ_Ergo.json";
import Json_CE_Lyon_YEAR_2021_PROJ_All from "./CE_Lyon_YEAR_2021_PROJ_All.json";
import Json_CE_Lyon_YEAR_2020_PROJ_Dev from "./CE_Lyon_YEAR_2020_PROJ_Dev.json";
import Json_CE_Lyon_YEAR_2020_PROJ_Ergo from "./CE_Lyon_YEAR_2020_PROJ_Ergo.json";
import Json_CE_Lyon_YEAR_2020_PROJ_All from "./CE_Lyon_YEAR_2020_PROJ_All.json";

/* Pour Rails
       const fetchCEData = async () => {
           const response = await fetch(data,{
               headers : {
                   'Content-Type': 'application/json',
                       'Accept': 'application/json'
               }
           })
           console.log(response)
       }
       JSONRecup()*/

export const fetchFilteredProductionMetrics = async ({excellenceCenter, year, projectType}) => {
    let Json = null
    if (excellenceCenter === "all" && year === "2021" && projectType === "dev") {
        Json = Json_CE_All_YEAR_2021_PROJ_Dev
    } else if (excellenceCenter === "all" && year === "2021" && projectType === "ergo") {
        Json = Json_CE_All_YEAR_2021_PROJ_Ergo
    } else if (excellenceCenter === "all" && year === "2021" && projectType === "all") {
        Json = Json_CE_All_YEAR_2021_PROJ_All
    } else if (excellenceCenter === "all" && year === "2020" && projectType === "dev") {
        Json = Json_CE_All_YEAR_2020_PROJ_Dev
    } else if (excellenceCenter === "all" && year === "2020" && projectType === "ergo") {
        Json = Json_CE_All_YEAR_2020_PROJ_Ergo
    } else if (excellenceCenter === "all" && year === "2020" && projectType === "all") {
        Json = Json_CE_All_YEAR_2020_PROJ_All
    } else if (excellenceCenter === "grenoble" && year === "2021" && projectType === "dev") {
        Json = Json_CE_Grenoble_YEAR_2021_PROJ_Dev
    } else if (excellenceCenter === "grenoble" && year === "2021" && projectType === "ergo") {
        Json = Json_CE_Grenoble_YEAR_2021_PROJ_Ergo
    } else if (excellenceCenter === "grenoble" && year === "2021" && projectType === "all") {
        Json = Json_CE_Grenoble_YEAR_2021_PROJ_All
    } else if (excellenceCenter === "grenoble" && year === "2020" && projectType === "dev") {
        Json = Json_CE_Grenoble_YEAR_2020_PROJ_Dev
    } else if (excellenceCenter === "grenoble" && year === "2020" && projectType === "ergo") {
        Json = Json_CE_Grenoble_YEAR_2020_PROJ_Ergo
    } else if (excellenceCenter === "grenoble" && year === "2020" && projectType === "all") {
        Json = Json_CE_Grenoble_YEAR_2020_PROJ_All
    } else if (excellenceCenter === "lyon" && year === "2021" && projectType === "dev") {
        Json = Json_CE_Lyon_YEAR_2021_PROJ_Dev
    } else if (excellenceCenter === "lyon" && year === "2021" && projectType === "ergo") {
        Json = Json_CE_Lyon_YEAR_2021_PROJ_Ergo
    } else if (excellenceCenter === "lyon" && year === "2021" && projectType === "all") {
        Json = Json_CE_Lyon_YEAR_2021_PROJ_All
    } else if (excellenceCenter === "lyon" && year === "2020" && projectType === "dev") {
        Json = Json_CE_Lyon_YEAR_2020_PROJ_Dev
    } else if (excellenceCenter === "lyon" && year === "2020" && projectType === "ergo") {
        Json = Json_CE_Lyon_YEAR_2020_PROJ_Ergo
    } else if (excellenceCenter === "lyon" && year === "2020" && projectType === "all") {
        Json = Json_CE_Lyon_YEAR_2020_PROJ_All
    }

    return new Promise((resolve, _) => {
        resolve(Json);
    });

}

export const fetchYears = async () => {
    return new Promise((resolve, _) => {
        const years = [{key: "2021", value:"2021"}, {key: "2020", value: "2020"}]
        resolve(years);
    });
}

export const fetchExcellenceCenters = async () => {
    return new Promise((resolve, _) => {
        const ce = [{key: "all", value: "Tous"}, {key: "lyon", value: "Lyon"}, {key: "grenoble", value:"Grenoble"}]
        resolve(ce);
    });
}

export const fetchProjectTypes = async () => {
    return new Promise((resolve, _) => {
        const projectsType = [{key: "all", value: "Tous"}, {key: "dev", value: "Dev"}, {key: "ergo", value:"Ergo"}]
        resolve(projectsType);
    });
}

export const fetchProductionMetrics = async() => {
    return new Promise ( (resolve, _) => {
        const actualYearJSONForAllProduction = Json_CE_All_YEAR_2021_PROJ_All
        resolve(actualYearJSONForAllProduction)
    })
}

export const fetchProductionMetricsLabel = async () => {
    return new Promise((resolve, _) => {
        const projectsType = [{key: "CA", value: "CA (k€)"}, {key: "TJM", value: "TJM (€)"}, {key: "availableDays", value:"# Jours dispo"},
            {key: "productionDays", value: "# Jours prod"}, {key: "interProductionDays", value: "# Jours interP"}, {key: "TO", value:"TO (%)"}]
        resolve(projectsType);
    });
}



