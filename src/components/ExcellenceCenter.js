import React, { useEffect, useState } from 'react';
import FilterSelector from './FilterSelector';
import ExcellenceCenterTable from './ExcellenceCenterTable';
import ExcellenceCenterBarChart from './ExcellenceCenterBarChart';
import {
  fetchExcellenceCenters, fetchYears, fetchProjectTypes, fetchProductionMetricsLabel,
} from '../API';
import './ExcellenceCenter.scss';
import { PROJECT_TYPE_ALL, PRODUCTION_CA, EXCELLENCE_CENTER_ALL } from '../keys';

const ExcellenceCenter = () => {
  const todayDate = new Date();
  const todayYear = todayDate.getFullYear().toString();

  const [years, setYears] = useState([]);
  const [currentYear, changeYear] = useState(years.length > 0 ? years[0].key : todayYear);

  const [excellenceCentersFilters, setExcellenceCentersFilters] = useState([]);
  const [currentExcellenceCentersFilter, changeExcellenceCentersFilter] = useState(
    excellenceCentersFilters.length > 0 ? excellenceCentersFilters[0].key : EXCELLENCE_CENTER_ALL,
  );

  const [projectTypesFilters, setProjectsTypesFilters] = useState([]);
  const [currentProjectTypesFilter, changeProjectTypesFilter] = useState(
    projectTypesFilters.length > 0 ? projectTypesFilters[0].key : PROJECT_TYPE_ALL,
  );

  const [productionMetric, setProductionMetric] = useState([]);
  const [currentProductionMetric, changeProductionMetric] = useState(
    productionMetric.length > 0 ? productionMetric[0].key : PRODUCTION_CA,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchFilterSelectorComponentData = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const [fetchedYears, fetchedExcellenceCenter,
          fetchedProjectTypes, fetchedProductionMetricLabel] = await Promise.all(
          [fetchYears(),
            fetchExcellenceCenters(),
            fetchProjectTypes(),
            fetchProductionMetricsLabel()],
        );
        setYears(fetchedYears);
        setExcellenceCentersFilters(fetchedExcellenceCenter);
        setProjectsTypesFilters(fetchedProjectTypes);
        setProductionMetric(fetchedProductionMetricLabel);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilterSelectorComponentData();
  }, []);

  const handleExcellenceCentersFilterChange = (e) => {
    changeExcellenceCentersFilter(e.target.value);
  };

  const handleYearChange = (e) => {
    changeYear(e.target.value);
  };

  const handleProjectTypesFilterChange = (e) => {
    changeProjectTypesFilter(e.target.value);
  };

  const handleProductionMetricFilterChange = (e) => {
    changeProductionMetric(e.target.value);
  };

  const renderSpinner = () => (
    <div>
      <div className="spinner" />
      <div className="spinner-text">Chargement de la BI ...</div>
    </div>
  );

  const renderLoadingError = () => (
    <section>
      <h1>Le serveur Planbot a rencontré une erreur.</h1>
      <h2>Veuillez réactualiser la page.</h2>
    </section>
  );

  if (isLoading) {
    return renderSpinner();
  }
  if (hasError) {
    return renderLoadingError();
  }
  return (
    <div className="excellence-center">
      <h2 className="excellence-center__title">Business Intelligency - CE</h2>
      <section>
        <div className="excellence-center__table__selectors">
          <FilterSelector
            label="Choix du centre d'excellence"
            options={excellenceCentersFilters}
            id="excellence-center-choice"
            onChange={handleExcellenceCentersFilterChange}
          />
          <FilterSelector label="Année" options={years} id="year" onChange={handleYearChange} />
          <FilterSelector
            label="Type de projet"
            options={projectTypesFilters}
            id="projects-type"
            onChange={handleProjectTypesFilterChange}
          />
        </div>

        <ExcellenceCenterTable
          className="excellence-center__table"
          excellenceCenter={currentExcellenceCentersFilter}
          year={currentYear}
          projectType={currentProjectTypesFilter}
        />
      </section>

      <section>
        <div className="excellence-center__bar-chart__selector">
          <FilterSelector
            label="Métrique de production globale sur l'année en cours"
            options={productionMetric}
            id="productionMetric"
            onChange={handleProductionMetricFilterChange}
          />
        </div>

        <ExcellenceCenterBarChart productionMetricsLabel={currentProductionMetric} />
        <div className="legend">Cliquer pour faire disparaître/apparaître le jeu de données</div>
      </section>
    </div>
  );
};

export default ExcellenceCenter;
