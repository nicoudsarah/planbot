import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  EXCELLENCE_CENTER_ALL, EXCELLENCE_CENTER_LYON, EXCELLENCE_CENTER_GRENOBLE,
  PROJECT_TYPE_ALL, PROJECT_TYPE_DEV, PROJECT_TYPE_ERGO,
  PRODUCTION_CA, PRODUCTION_TJM, PRODUCTION_AVAILABLEDAYS,
  PRODUCTION_PRODUCTIONDAYS, PRODUCTION_INTERPRODUCTIONDAYS, PRODUCTION_TO,
} from '../keys';

import ExcellenceCenter from './ExcellenceCenter';

describe('ExcellenceCenter before fetching data', () => {
  it('should show a spinner during the loading', () => {
    const ExcellenceCenterWrapperObject = shallow(<ExcellenceCenter />);
    const ExcellenceCenterTitleText = ExcellenceCenterWrapperObject.find('[data-test="spinner"]').text();
    expect(ExcellenceCenterTitleText).toEqual('Chargement de la BI ...');
  });
});

describe('ExcellenceCenter after fetching data', () => {
  let ExcellenceCenterWrapperObject;

  beforeEach(async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
    });
    ExcellenceCenterWrapperObject.update();
  });

  it('should display the excellence center section title', () => {
    const ExcellenceCenterTitleText = ExcellenceCenterWrapperObject.find('.excellence-center__title').text();
    expect(ExcellenceCenterTitleText).toEqual('Business Intelligency - CE');
  });

  it('should show a value of 69 for january on CA column table for Lyon excellence center', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(0).props().onChange({ target: { value: EXCELLENCE_CENTER_LYON } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual('69');
  });

  it('should show a value of 38 for january on CA column table for Grenoble excellence center', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(0).props().onChange({ target: { value: EXCELLENCE_CENTER_GRENOBLE } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual('38');
  });

  it('should show a value of 107 for january on CA column table for all excellence centers', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(0).props().onChange({ target: { value: EXCELLENCE_CENTER_ALL } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual('107');
  });

  it('should show a value of 2021 for january on TJM column table for year 2021', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(1).props().onChange({ target: { value: '2021' } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__TJM').at(0).text()).toEqual('2021');
  });

  it('should show a value of 2020 for january on TJM column table for year 2020', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(1).props().onChange({ target: { value: '2020' } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__TJM').at(0).text()).toEqual('2020');
  });

  it('should show a value of 100 for january on availableDays column table for all project type', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(2).props().onChange({ target: { value: PROJECT_TYPE_ALL } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__availableDays').at(0).text()).toEqual('100');
  });

  it('should show a value of 75 for january on availableDays column table for dev project type', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(2).props().onChange({ target: { value: PROJECT_TYPE_DEV } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__availableDays').at(0).text()).toEqual('75');
  });

  it('should show a value of 25 for january on availableDays column table for ergo project type', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(2).props().onChange({ target: { value: PROJECT_TYPE_ERGO } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__availableDays').at(0).text()).toEqual('25');
  });

  it('should show a monthly february value of 20 on the graph for CA production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_CA } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(20);
  });

  it('should show a monthly february value of 700 on the graph for TJM production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_TJM } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(700);
  });

  it('should show a monthly february value of 23 on the graph for availableDays production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_AVAILABLEDAYS } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(23);
  });

  it('should show a monthly february value of 21 on the graph for productionDays production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_PRODUCTIONDAYS } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(21);
  });

  it('should show a monthly february value of 4 on the graph for interProductionDays production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_INTERPRODUCTIONDAYS } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(4);
  });

  it('should show a monthly february value of 91.30 on the graph for TO production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_TO } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual('91.30');
  });

  it('should show a cumulated february value of 127 on the graph for CA production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_CA } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[0].data[1]).toEqual(127);
  });

  it('should show a cumulated february value of 1360.50 on the graph for TJM production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_TJM } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[0].data[1]).toEqual('1360.50');
  });

  it('should show a cumulated february value of 123 on the graph for available days production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_AVAILABLEDAYS } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[0].data[1]).toEqual(123);
  });

  it('should show a cumulated february value of 41 on the graph for production days production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_PRODUCTIONDAYS } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[0].data[1]).toEqual(41);
  });

  it('should show a cumulated february value of 19 on the graph for inter production days production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_INTERPRODUCTIONDAYS } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[0].data[1]).toEqual(19);
  });

  it('should show a cumulated february value of 33.33 on the graph for TO production metric', async () => {
    await act(async () => {
      ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({ target: { value: PRODUCTION_TO } });
    });
    ExcellenceCenterWrapperObject.update();
    expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[0].data[1]).toEqual('33.33');
  });
});
