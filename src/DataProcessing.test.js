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

  it('should return userId of the formations actors (authors and instructors)', () => {
    const JSONFormations = [
      { id: 1, timeReports: [{ userId: 1, contribution: 'author' }, { userId: 2, contribution: 'instructor' }] },
      { id: 2, timeReports: [{ userId: 3, contribution: 'disciple' }, { userId: 4, contribution: 'instructor' }] },
      { id: 3, timeReports: [{ userId: 5, contribution: 'author' }, { userId: 6, contribution: 'disciple' }] },
    ];
    const actualUserIdOfContributors = (
      DataProcessing.collectActorsUserIds(JSONFormations)
    );
    const expectedUserIdOfContributors = [new Set([1, 2]), new Set([4]), new Set([5])];
    expect(actualUserIdOfContributors).toEqual(expectedUserIdOfContributors);
  });

  it('should convert userId to the name of the user', () => {
    const setOfUsersId = [new Set([1, 2]), new Set([2, 3]), new Set([1, 3])];
    const usersJson = [{ id: 1, name: 'Pierre' }, { id: 2, name: 'Paul' }, { id: 3, name: 'Jacques' }];
    const actualUserNameConversion = (
      DataProcessing.createUserNamesTable(setOfUsersId, usersJson)
    );
    const expectedUserNameConversion = [['Pierre', 'Paul'], ['Paul', 'Jacques'], ['Pierre', 'Jacques']];
    expect(actualUserNameConversion).toEqual(expectedUserNameConversion);
  });

  it('should collect only user id of actual year actors', () => {
    const actorsUserIds = [new Set([1, 2]), new Set([2, 3]), new Set([2, 1]), new Set([1, 3])];
    const JsonFormationReports = [
      { id: 1, timeReports: [{ userId: 1, date: '02/01/2021' }, { userId: 2, date: '02/01/2016' }] },
      { id: 2, timeReports: [{ userId: 2, date: '02/01/2016' }, { userId: 3, date: '02/01/2021' }] },
      { id: 3, timeReports: [{ userId: 2, date: '02/01/2016' }, { userId: 1, date: '02/01/2016' }] },
      { id: 4, timeReports: [{ userId: 1, date: '02/01/2021' }, { userId: 3, date: '02/01/2021' }] },
    ];
    const actualYear = 2021;
    const actualActorsIdOf2021 = (
      DataProcessing.collectActualYearActorsIds(actorsUserIds, JsonFormationReports, actualYear)
    );
    const expectedActorsIdOf2021 = [[1], [3], [], [1, 3]];
    expect(actualActorsIdOf2021).toEqual(expectedActorsIdOf2021);
  });

  it('should collect actors user id except of actual year actors', () => {
    const actorsUserIds = [new Set([1, 2]), new Set([2, 3]), new Set([2, 1]), new Set([1, 3])];
    const JsonFormationReports = [
      { id: 1, timeReports: [{ userId: 1, date: '02/01/2021' }, { userId: 2, date: '02/01/2016' }] },
      { id: 2, timeReports: [{ userId: 2, date: '02/01/2016' }, { userId: 3, date: '02/01/2021' }] },
      { id: 3, timeReports: [{ userId: 2, date: '02/01/2016' }, { userId: 1, date: '02/01/2016' }] },
      { id: 4, timeReports: [{ userId: 1, date: '02/01/2021' }, { userId: 3, date: '02/01/2021' }] },
    ];
    const actualYear = 2021;
    const actualActorsIds = (
      DataProcessing.collectOtherActorsIds(actorsUserIds, JsonFormationReports, actualYear)
    );
    const expectedActorsIds = [[2], [2], [2, 1], []];
    expect(actualActorsIds).toEqual(expectedActorsIds);
  });
});
