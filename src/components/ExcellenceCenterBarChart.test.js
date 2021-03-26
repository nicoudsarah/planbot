import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from "react-dom/test-utils";

import ExcellenceCenterBarChart from "./ExcellenceCenterBarChart";

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

/*
const calculateValueToDisplayForProductionMetrics = require ('../ src / calculateValueToDisplayForProductionMetrics')

describe('ExcellenceCenter', () =>{

    it( 'should calculate cumulate data to display when production metric is "TJM"', () => {
        const CAValuesForThreeMonths = [100, 200, 300]
        const productionMetricsLabel = "TJM"
        const valueToDisplay = calculateValueToDisplayForProductionMetrics(CAValuesForThreeMonths, productionMetricsLabel)
        expect(valueToDisplay).toEqual([100, 150, 300])
    })
})*/
