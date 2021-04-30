// import * as React from 'react';
import DataProcessing from './DataProcessing';
import {
  PRODUCTION_CA, PRODUCTION_TJM, PRODUCTION_AVAILABLEDAYS,
} from './keys';

describe('Dataprocessing', () => {
  it('should compute a table of added values for availableDays cumulated production metric', () => {
    const months = ['january', 'february', 'march'];
    const productionMetricsValues = [100, 200, 300];
    const productionMetricsLabel = PRODUCTION_AVAILABLEDAYS;
    const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(
      months, productionMetricsValues, productionMetricsLabel,
    );
    expect(valueToDisplay).toEqual([100, 300, 600]);
  });

  it('should compute a table of added values convert in k€ for CA cumulated production metric', () => {
    const months = ['january', 'february', 'march'];
    const productionMetricsValues = [100000, 200000, 300000];
    const productionMetricsLabel = PRODUCTION_CA;
    const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(
      months, productionMetricsValues, productionMetricsLabel,
    );
    expect(valueToDisplay).toEqual([100, 300, 600]);
  });

  it('should compute a table of average values for TJM cumulated production metric ', () => {
    const months = ['january', 'february', 'march'];
    const productionMetricsValues = [100, 200, 300];
    const productionMetricsLabel = PRODUCTION_TJM;
    const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(
      months, productionMetricsValues, productionMetricsLabel,
    );
    expect(valueToDisplay).toEqual(['100.00', '150.00', '200.00']);
  });

  it('should compute a table of average values for TO cumulated production metric ', () => {
    const months = ['january', 'february', 'march'];
    const availableDaysValues = [20, 20, 20];
    const productionDaysValues = [5, 10, 15];
    const valueToDisplay = DataProcessing.computeCumulatedTOs(
      months, availableDaysValues, productionDaysValues,
    );
    expect(valueToDisplay).toEqual(['25.00', '37.50', '50.00']);
  });

  it('should compute a table of values for TO monthly production metric', () => {
    const availableDaysValues = [20, 20, 20];
    const productionDaysValues = [5, 10, 15];
    const valueToDisplay = DataProcessing.computeTOs(
      availableDaysValues, productionDaysValues,
    );
    expect(valueToDisplay).toEqual(['25.00', '50.00', '75.00']);
  });

  it('should return only the internal formation names', () => {
    const JSONFormations = [
      { id: 1, name: 'formation1', external: false },
      { id: 2, name: 'formation2', external: true },
      { id: 3, name: 'formation3', external: false },
    ];
    const actualInternalFormationsSelected = (
      DataProcessing.collectInternalFormationsDetails(JSONFormations)
    );
    const expectedInternalFormationSelected = [
      { id: 1, name: 'formation1', external: false },
      { id: 3, name: 'formation3', external: false },
    ];
    expect(actualInternalFormationsSelected).toEqual(expectedInternalFormationSelected);
  });
});
