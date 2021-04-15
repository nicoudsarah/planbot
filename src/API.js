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
import { PROJECT_TYPE_ALL, PRODUCTION_CA, EXCELLENCE_CENTER_ALL } from './keys';

export const fetchFilteredProductionMetrics = async ({ excellenceCenter, year, projectType }) => {
  let Json = null;
  if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2021' && projectType === 'dev') {
    Json = JsonCEAllYear2021ProjDev;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2021' && projectType === 'ergo') {
    Json = JsonCEAllYear2021ProjErgo;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2021' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCEAllYear2021ProjAll;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2020' && projectType === 'dev') {
    Json = JsonCEAllYear2020ProjDev;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2020' && projectType === 'ergo') {
    Json = JsonCEAllYear2020ProjErgo;
  } else if (excellenceCenter === EXCELLENCE_CENTER_ALL && year === '2020' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCEAllYear2020ProjAll;
  } else if (excellenceCenter === 'grenoble' && year === '2021' && projectType === 'dev') {
    Json = JsonCEGrenobleYear2021ProjDev;
  } else if (excellenceCenter === 'grenoble' && year === '2021' && projectType === 'ergo') {
    Json = JsonCEGrenobleYear2021ProjErgo;
  } else if (excellenceCenter === 'grenoble' && year === '2021' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCEGrenobleYear2021ProjAll;
  } else if (excellenceCenter === 'grenoble' && year === '2020' && projectType === 'dev') {
    Json = JsonCEGrenobleYear2020ProjDev;
  } else if (excellenceCenter === 'grenoble' && year === '2020' && projectType === 'ergo') {
    Json = JsonCEGrenobleYear2020ProjErgo;
  } else if (excellenceCenter === 'grenoble' && year === '2020' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCEGrenobleYear2020ProjAll;
  } else if (excellenceCenter === 'lyon' && year === '2021' && projectType === 'dev') {
    Json = JsonCELyonYear2021ProjDev;
  } else if (excellenceCenter === 'lyon' && year === '2021' && projectType === 'ergo') {
    Json = JsonCELyonYear2021ProjErgo;
  } else if (excellenceCenter === 'lyon' && year === '2021' && projectType === PROJECT_TYPE_ALL) {
    Json = JsonCELyonYear2021ProjAll;
  } else if (excellenceCenter === 'lyon' && year === '2020' && projectType === 'dev') {
    Json = JsonCELyonYear2020ProjDev;
  } else if (excellenceCenter === 'lyon' && year === '2020' && projectType === 'ergo') {
    Json = JsonCELyonYear2020ProjErgo;
  } else if (excellenceCenter === 'lyon' && year === '2020' && projectType === PROJECT_TYPE_ALL) {
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
  const ce = [{ key: EXCELLENCE_CENTER_ALL, value: 'Tous' }, { key: 'lyon', value: 'Lyon' }, { key: 'grenoble', value: 'Grenoble' }];
  resolve(ce);
});

export const fetchProjectTypes = async () => new Promise((resolve) => {
  const projectsType = [{ key: PROJECT_TYPE_ALL, value: 'Tous' }, { key: 'dev', value: 'Dev' }, { key: 'ergo', value: 'Ergo' }];
  resolve(projectsType);
});

export const fetchProductionMetrics = async () => new Promise((resolve) => {
  const actualYearJSONForAllProduction = JsonCEAllYear2021ProjAll;
  resolve(actualYearJSONForAllProduction);
});

export const fetchProductionMetricsLabel = async () => new Promise((resolve) => {
  const projectsType = [{ key: PRODUCTION_CA, value: 'CA (k€)' }, { key: 'TJM', value: 'TJM (€)' }, { key: 'availableDays', value: '# Jours dispo' },
    { key: 'productionDays', value: '# Jours prod' }, { key: 'interProductionDays', value: '# Jours interP' }, { key: 'TO', value: 'TO (%)' }];
  resolve(projectsType);
});
