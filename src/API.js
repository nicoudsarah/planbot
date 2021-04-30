import JsonCEAllYear2021ProjDev from './CE_All_YEAR_2021_PROJ_Dev.json';
import JsonCEAllYear2021ProjErgo from './CE_All_YEAR_2021_PROJ_Ergo.json';
import JsonCEAllYear2021ProjAll from './CE_All_YEAR_2021_PROJ_All.json';
import JsonCEAllYear2020ProjDev from './CE_All_YEAR_2020_PROJ_Dev.json';
import JsonCEAllYear2020ProjErgo from './CE_All_YEAR_2020_PROJ_Ergo.json';
import JsonCEAllYear2020ProjAll from './CE_All_YEAR_2020_PROJ_All.json';
import JsonCEGrenobleYear2021ProjDev from './CE_Grenoble_YEAR_2021_PROJ_Dev.json';
import JsonCEGrenobleYear2021ProjErgo from './CE_Grenoble_YEAR_2021_PROJ_Ergo.json';
import JsonCEGrenobleYear2021ProjAll from './CE_Grenoble_YEAR_2021_PROJ_All.json';
import JsonCEGrenobleYear2020ProjDev from './CE_Grenoble_YEAR_2020_PROJ_Dev.json';
import JsonCEGrenobleYear2020ProjErgo from './CE_Grenoble_YEAR_2020_PROJ_Ergo.json';
import JsonCEGrenobleYear2020ProjAll from './CE_Grenoble_YEAR_2020_PROJ_All.json';
import JsonCELyonYear2021ProjDev from './CE_Lyon_YEAR_2021_PROJ_Dev.json';
import JsonCELyonYear2021ProjErgo from './CE_Lyon_YEAR_2021_PROJ_Ergo.json';
import JsonCELyonYear2021ProjAll from './CE_Lyon_YEAR_2021_PROJ_All.json';
import JsonCELyonYear2020ProjDev from './CE_Lyon_YEAR_2020_PROJ_Dev.json';
import JsonCELyonYear2020ProjErgo from './CE_Lyon_YEAR_2020_PROJ_Ergo.json';
import JsonCELyonYear2020ProjAll from './CE_Lyon_YEAR_2020_PROJ_All.json';
import {
  EXCELLENCE_CENTER_ALL, EXCELLENCE_CENTER_LYON, EXCELLENCE_CENTER_GRENOBLE,
  PROJECT_TYPE_ALL, PROJECT_TYPE_DEV, PROJECT_TYPE_ERGO,
  PRODUCTION_CA, PRODUCTION_TJM, PRODUCTION_AVAILABLEDAYS,
  PRODUCTION_PRODUCTIONDAYS, PRODUCTION_INTERPRODUCTIONDAYS, PRODUCTION_TO,
} from './keys';
import JsonFormationReports from './Formations_Reports.json';

export const fetchFilteredProductionMetrics = async ({ excellenceCenter, year, projectType }) => {
  let Json = null;
  if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2021' && projectType === PROJECT_TYPE_DEV) {
    Json = JsonCEAllYear2021ProjDev;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2021' && projectType === PROJECT_TYPE_ERGO) {
    Json = JsonCEAllYear2021ProjErgo;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2021' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCEAllYear2021ProjAll;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2020' && projectType === PROJECT_TYPE_DEV) {
    Json = JsonCEAllYear2020ProjDev;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2020' && projectType === PROJECT_TYPE_ERGO) {
    Json = JsonCEAllYear2020ProjErgo;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2020' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCEAllYear2020ProjAll;
  } else if (excellenceCenter === EXCELLENCE_CENTER_GRENOBLE && year === '2021' && projectType === PROJECT_TYPE_DEV) {
    Json = JsonCEGrenobleYear2021ProjDev;
  } else if (excellenceCenter === EXCELLENCE_CENTER_GRENOBLE && year === '2021' && projectType === PROJECT_TYPE_ERGO) {
    Json = JsonCEGrenobleYear2021ProjErgo;
  } else if (excellenceCenter === EXCELLENCE_CENTER_GRENOBLE && year === '2021' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCEGrenobleYear2021ProjAll;
  } else if (excellenceCenter === EXCELLENCE_CENTER_GRENOBLE && year === '2020' && projectType === PROJECT_TYPE_DEV) {
    Json = JsonCEGrenobleYear2020ProjDev;
  } else if (excellenceCenter === EXCELLENCE_CENTER_GRENOBLE && year === '2020' && projectType === PROJECT_TYPE_ERGO) {
    Json = JsonCEGrenobleYear2020ProjErgo;
  } else if (excellenceCenter === EXCELLENCE_CENTER_GRENOBLE && year === '2020' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCEGrenobleYear2020ProjAll;
  } else if (excellenceCenter === EXCELLENCE_CENTER_LYON && year === '2021' && projectType === PROJECT_TYPE_DEV) {
    Json = JsonCELyonYear2021ProjDev;
  } else if (excellenceCenter === EXCELLENCE_CENTER_LYON && year === '2021' && projectType === PROJECT_TYPE_ERGO) {
    Json = JsonCELyonYear2021ProjErgo;
  } else if (excellenceCenter === EXCELLENCE_CENTER_LYON && year === '2021' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCELyonYear2021ProjAll;
  } else if (excellenceCenter === EXCELLENCE_CENTER_LYON && year === '2020' && projectType === PROJECT_TYPE_DEV) {
    Json = JsonCELyonYear2020ProjDev;
  } else if (excellenceCenter === EXCELLENCE_CENTER_LYON && year === '2020' && projectType === PROJECT_TYPE_ERGO) {
    Json = JsonCELyonYear2020ProjErgo;
  } else if (excellenceCenter === EXCELLENCE_CENTER_LYON && year === '2020' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCELyonYear2020ProjAll;
  }

  return new Promise((resolve) => {
    resolve(Json);
  });
};

export const fetchYears = async () => new Promise((resolve) => {
  const years = [{ key: '2021', value: '2021' }, { key: '2020', value: '2020' }];
  resolve(years);
});

export const fetchExcellenceCenters = async () => new Promise((resolve) => {
  const ce = [{ key: EXCELLENCE_CENTER_ALL, value: 'Tous' },
    { key: EXCELLENCE_CENTER_LYON, value: 'Lyon' },
    { key: EXCELLENCE_CENTER_GRENOBLE, value: 'Grenoble' }];
  resolve(ce);
});

export const fetchProjectTypes = async () => new Promise((resolve) => {
  const projectsType = [{ key: PROJECT_TYPE_ALL, value: 'Tous' },
    { key: PROJECT_TYPE_DEV, value: 'Dev' },
    { key: PROJECT_TYPE_ERGO, value: 'Ergo' }];
  resolve(projectsType);
});

export const fetchProductionMetrics = async () => new Promise((resolve) => {
  const actualYearJSONForAllProduction = JsonCEAllYear2021ProjAll;
  resolve(actualYearJSONForAllProduction);
});

export const fetchProductionMetricsLabel = async () => new Promise((resolve) => {
  const projectsType = [{ key: PRODUCTION_CA, value: 'CA (k€)' }, { key: PRODUCTION_TJM, value: 'TJM (€)' },
    { key: PRODUCTION_AVAILABLEDAYS, value: '# Jours dispo' }, { key: PRODUCTION_PRODUCTIONDAYS, value: '# Jours prod' },
    { key: PRODUCTION_INTERPRODUCTIONDAYS, value: '# Jours interP' }, { key: PRODUCTION_TO, value: 'TO (%)' }];
  resolve(projectsType);
});

export const fetchFormationsReports = async () => new Promise((resolve) => {
  resolve(JsonFormationReports.formations);
});
