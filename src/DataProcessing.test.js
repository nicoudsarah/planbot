import * as React from 'react';
import {DataProcessing} from "./DataProcessing";

describe ('Dataprocessing',  () => {

    it( 'should compute a table of added values for availableDays cumulated production metric', () => {
        const months = ["january", "february", "march"]
        const productionMetricsValues = [100, 200, 300]
        const productionMetricsLabel = "availableDays"
        const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(months, productionMetricsValues, productionMetricsLabel)
        expect(valueToDisplay).toEqual([100, 300, 600])
    })

    it( 'should compute a table of added values convert in k€ for CA cumulated production metric', () => {
        const months = ["january", "february", "march"]
        const productionMetricsValues = [100000, 200000, 300000]
        const productionMetricsLabel = "CA"
        const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(months, productionMetricsValues, productionMetricsLabel)
        expect(valueToDisplay).toEqual([100, 300, 600])
    })

    it( 'should compute a table of average values for TJM cumulated production metric ', () => {
        const months = ["january", "february", "march"]
        const productionMetricsValues = [100, 200, 300]
        const productionMetricsLabel = "TJM"
        const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(months, productionMetricsValues, productionMetricsLabel)
        expect(valueToDisplay).toEqual(['100.00', '150.00', '200.00'])
    })

    it( 'should compute a table of average values for TO cumulated production metric ', () => {
        const months = ["january", "february", "march"]
        const availableDaysValues = [20, 20, 20]
        const productionDaysValues = [5, 10, 15]
        const valueToDisplay = DataProcessing.computeCumulatedTOs(months, availableDaysValues, productionDaysValues)
        expect(valueToDisplay).toEqual(['25.00', '37.50', '50.00'])
    })

    it( 'should compute a table of values for TO monthly production metric', () => {
        const availableDaysValues = [20, 20, 20]
        const productionDaysValues = [5, 10, 15]
        const valueToDisplay = DataProcessing.computeTOs(availableDaysValues, productionDaysValues)
        expect(valueToDisplay).toEqual(['25.00', '50.00', '75.00'])
    })
})