import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from "react-dom/test-utils";
import {DataProcessing} from "./DataProcessing";

/**
* CAS DE TESTS
*
* SI métrique de production = CA et datas = [100000, 200000, 300000]
    * ALORS on obtient : datas cumulées (en ke) = [100, 300, 600]
    *
    * SI métrique de production = TJM et datas = [100, 200, 300]
    * ALORS on obtient : datas cumulées = [100, 150, 300]
    *
    * SI métrique de production = TO et data jours dispos = [20, 20, 20] et data jours prod = [5, 10, 15]
    * ALORS on obtient : datas cumulées = [25, 37.5, 50]
    *
    * SI métrique de production = AUTRE et datas = [100, 200, 300]
    * ALORS on obtient : datas cumulées = [100, 300, 600]
    *
    * */

describe ('Dataprocessing',  () => {

    it( 'should compute a table of added values for availableDays production metric', () => {
        const months = ["january", "february", "march"]
        const productionMetricsValues = [100, 200, 300]
        const productionMetricsLabel = "availableDays"
        const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(months, productionMetricsValues, productionMetricsLabel)
        expect(valueToDisplay).toEqual([100, 300, 600])
    })

    it( 'should compute a table of added values convert in k€ for CA production metric', () => {
        const months = ["january", "february", "march"]
        const productionMetricsValues = [100000, 200000, 300000]
        const productionMetricsLabel = "CA"
        const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(months, productionMetricsValues, productionMetricsLabel)
        expect(valueToDisplay).toEqual([100, 300, 600])
    })

    it( 'should compute a table of average values for TJM production metric', () => {
        const months = ["january", "february", "march"]
        const productionMetricsValues = [100, 200, 300]
        const productionMetricsLabel = "TJM"
        const valueToDisplay = DataProcessing.computeGenericCumulatedMetrics(months, productionMetricsValues, productionMetricsLabel)
        expect(valueToDisplay).toEqual(['100.00', '150.00', '200.00'])
    })

    it( 'should compute a table of average values for TO production metric', () => {
        const months = ["january", "february", "march"]
        const availableDaysValues = [20, 20, 20]
        const productionDaysValues = [5, 10, 15]
        const valueToDisplay = DataProcessing.computeCumulatedTOs(months, availableDaysValues, productionDaysValues)
        expect(valueToDisplay).toEqual(['25.00', '37.50', '50.00'])
    })

    it( 'should compute a table of values for TO production metric', () => {
        const availableDaysValues = [20, 20, 20]
        const productionDaysValues = [5, 10, 15]
        const valueToDisplay = DataProcessing.computeTOs(availableDaysValues, productionDaysValues)
        expect(valueToDisplay).toEqual(['25.00', '50.00', '75.00'])
    })
})