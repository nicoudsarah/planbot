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

/* Pour Ruby
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

export const fetchCEData = async ({ce, year, projectType}) => {
    let Json = null

    if (ce === "all" && year === "2021" && projectType === "dev") {
        Json = Json_CE_All_YEAR_2021_PROJ_Dev
    } else if (ce === "all" && year === "2021" && projectType === "ergo") {
        Json = Json_CE_All_YEAR_2021_PROJ_Ergo
    } else if (ce === "all" && year === "2021" && projectType === "all") {
        Json = Json_CE_All_YEAR_2021_PROJ_All
    } else if (ce === "all" && year === "2020" && projectType === "dev") {
        Json = Json_CE_All_YEAR_2020_PROJ_Dev
    } else if (ce === "all" && year === "2020" && projectType === "ergo") {
        Json = Json_CE_All_YEAR_2020_PROJ_Ergo
    } else if (ce === "all" && year === "2020" && projectType === "all") {
        Json = Json_CE_All_YEAR_2020_PROJ_All
    } else if (ce === "grenoble" && year === "2021" && projectType === "dev") {
        Json = Json_CE_Grenoble_YEAR_2021_PROJ_Dev
    } else if (ce === "grenoble" && year === "2021" && projectType === "ergo") {
        Json = Json_CE_Grenoble_YEAR_2021_PROJ_Ergo
    } else if (ce === "grenoble" && year === "2021" && projectType === "all") {
        Json = Json_CE_Grenoble_YEAR_2021_PROJ_All
    } else if (ce === "grenoble" && year === "2020" && projectType === "dev") {
        Json = Json_CE_Grenoble_YEAR_2020_PROJ_Dev
    } else if (ce === "grenoble" && year === "2020" && projectType === "ergo") {
        Json = Json_CE_Grenoble_YEAR_2020_PROJ_Ergo
    } else if (ce === "grenoble" && year === "2020" && projectType === "all") {
        Json = Json_CE_Grenoble_YEAR_2020_PROJ_All
    } else if (ce === "lyon" && year === "2021" && projectType === "dev") {
        Json = Json_CE_Lyon_YEAR_2021_PROJ_Dev
    } else if (ce === "lyon" && year === "2021" && projectType === "ergo") {
        Json = Json_CE_Lyon_YEAR_2021_PROJ_Ergo
    } else if (ce === "lyon" && year === "2021" && projectType === "all") {
        Json = Json_CE_Lyon_YEAR_2021_PROJ_All
    } else if (ce === "lyon" && year === "2020" && projectType === "dev") {
        Json = Json_CE_Lyon_YEAR_2020_PROJ_Dev
    } else if (ce === "lyon" && year === "2020" && projectType === "ergo") {
        Json = Json_CE_Lyon_YEAR_2020_PROJ_Ergo
    } else if (ce === "lyon" && year === "2020" && projectType === "all") {
        Json = Json_CE_Lyon_YEAR_2020_PROJ_All
    }

    return new Promise((resolve, _) => {
        resolve(Json);
    });

}


