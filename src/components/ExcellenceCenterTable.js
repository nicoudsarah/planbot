import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchFilteredProductionMetrics } from '../API';
import './ExcellenceCenterTable.scss';
import DataProcessing from '../DataProcessing';
import { PRODUCTION_TO } from '../keys';

const ExcellenceCenterTable = ({ excellenceCenter, projectType, year }) => {
  const productionMetricsLabels = ['CA (k€)', 'TJM (€)', '# Jours dispo', '# Jours prod', '# Jours interP', 'TO (%)'];
  const frenchMonths = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  const [selectedYearProductionMetrics, changeProductionMetrics] = useState(null);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const setProductionMetricsWithFilters = async () => {
      setHasError(false);
      try {
        changeProductionMetrics((
          await fetchFilteredProductionMetrics({ excellenceCenter, year, projectType })
        ));
      } catch (e) {
        setHasError(true);
      }
    };

    setProductionMetricsWithFilters();
  }, [excellenceCenter, projectType, year]);
  const months = selectedYearProductionMetrics && Object.keys(selectedYearProductionMetrics);

  const getProductionMetricsValuesFromJson = (productionMetric) => months.map(
    (month) => selectedYearProductionMetrics[month][productionMetric],
  );

  const extractProductionMetricFromJson = (productionMetric) => {
    if (months && selectedYearProductionMetrics) {
      if (productionMetric === PRODUCTION_TO) {
        const productionDaysValues = getProductionMetricsValuesFromJson('productionDays');
        const availableDaysValues = getProductionMetricsValuesFromJson('availableDays');
        return DataProcessing.computeTOs(availableDaysValues, productionDaysValues);
      }
      return getProductionMetricsValuesFromJson(productionMetric);
    }
    return '';
  };

  const computeCumulatedMetricsFromJson = (productionMetric) => {
    if (months && selectedYearProductionMetrics) {
      if (productionMetric === PRODUCTION_TO) {
        // we can not use generic method because available days change for each month
        return DataProcessing.computeCumulatedTOs(
          months,
          getProductionMetricsValuesFromJson('availableDays'),
          getProductionMetricsValuesFromJson('productionDays'),
        );
      }
      return DataProcessing.computeGenericCumulatedMetrics(
        months,
        getProductionMetricsValuesFromJson(productionMetric),
        productionMetric,
      );
    }
    return null;
  };

  const computeActualTotalMetrics = (ProductionMetric) => {
    if (months && selectedYearProductionMetrics) {
      const computedValues = computeCumulatedMetricsFromJson(ProductionMetric);
      return computedValues[computedValues.length - 1];
    }
    return null;
  };

  const renderLoadingError = () => (
    <section>
      <h1>Le serveur Planbot a rencontré une erreur.</h1>
      <h2>Veuillez réactualiser la page.</h2>
    </section>
  );

  if (hasError) {
    return renderLoadingError();
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th colSpan="6">Valeurs mensuelles</th>
            <th colSpan="6">Valeurs annuelles à date</th>
          </tr>
          <tr>
            <th id="month-cell">Mois</th>
            {productionMetricsLabels.map((item) => <th key={item} id="month-cell-item">{item}</th>)}
            {productionMetricsLabels.map((item) => <th key={item}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {selectedYearProductionMetrics && months && months.map((month, index) => (
            <tr key={month} className="ExcellenceCenterTable__row">
              <td key={month} className="ExcellenceCenterTable__row-item">{frenchMonths[index]}</td>
              <td className="ExcellenceCenterTable__row-item__CA">{(extractProductionMetricFromJson('CA')[index]) / 1000}</td>
              <td className="ExcellenceCenterTable__row-item__TJM">{extractProductionMetricFromJson('TJM')[index]}</td>
              <td className="ExcellenceCenterTable__row-item__availableDays">{extractProductionMetricFromJson('availableDays')[index]}</td>
              <td className="ExcellenceCenterTable__row-item">{extractProductionMetricFromJson('productionDays')[index]}</td>
              <td className="ExcellenceCenterTable__row-item">{extractProductionMetricFromJson('interProductionDays')[index]}</td>
              <td className="ExcellenceCenterTable__row-item">{extractProductionMetricFromJson('TO')[index]}</td>

              <td className="ExcellenceCenterTable__row-item__CA">{computeCumulatedMetricsFromJson('CA')[index]}</td>
              <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson('TJM')[index]}</td>
              <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson('availableDays')[index]}</td>
              <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson('productionDays')[index]}</td>
              <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson('interProductionDays')[index]}</td>
              <td className="ExcellenceCenterTable__row-item">{computeCumulatedMetricsFromJson('TO')[index]}</td>
            </tr>
          ))}
          <tr>
            <td className="ExcellenceCenterTable__row-total-item">Total annuel</td>
            <td className="ExcellenceCenterTable__row-total-item__CA">{computeActualTotalMetrics('CA')}</td>
            <td />
            <td className="ExcellenceCenterTable__row-total-item">{computeActualTotalMetrics('availableDays')}</td>
            <td className="ExcellenceCenterTable__row-total-item">{computeActualTotalMetrics('productionDays')}</td>
            <td className="ExcellenceCenterTable__row-total-item">{computeActualTotalMetrics('interProductionDays')}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

ExcellenceCenterTable.propTypes = {
  excellenceCenter: PropTypes.string.isRequired,
  projectType: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default ExcellenceCenterTable;
