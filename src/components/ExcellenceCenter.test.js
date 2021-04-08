import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from "react-dom/test-utils";
import {Bar, defaults} from "react-chartjs-2"


import ExcellenceCenter from "./ExcellenceCenter"
import FilterSelector from "./FilterSelector";

describe('ExcellenceCenter', () =>{

    beforeEach(() => {
        jest.mock('react-chartjs-2', () => ({
            Bar: () => null,
        }))

    });

    it('should display the excellence center section title', () => {
        const ExcellenceCenterWrapperObject = shallow(<ExcellenceCenter  />);
        const ExcellenceCenterTitleText = ExcellenceCenterWrapperObject.find('.excellence-center__title').text();
        expect(ExcellenceCenterTitleText).toEqual("Business Intelligency - CE");
    });

    it('should show a value of 69000 for january on CA column for Lyon excellence center',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
             ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter/>);
             ExcellenceCenterWrapperObject.find('FilterSelector').at(0).props().onChange({target:{value:"lyon"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual("69")
    })

    it('should show a value of 38000 for january on CA column for Grenoble excellence center',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(0).props().onChange({target:{value:"grenoble"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual("38")
    })

    it('should show a value of 107000 for january on CA column for all excellence centers',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(0).props().onChange({target:{value:"all"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual("107")
    })

    it('should show a value of 2021 for january on TJM column for year 2021',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(1).props().onChange({target:{value:"2021"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__TJM').at(0).text()).toEqual("2021")
    })

    it('should show a value of 2020 for january on TJM column for year 2020',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(1).props().onChange({target:{value:"2020"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__TJM').at(0).text()).toEqual("2020")
    })

    it('should show a value of 100 for january on availableDays column for all project type',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(2).props().onChange({target:{value:"all"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__availableDays').at(0).text()).toEqual("100")
    })

    it('should show a value of 75 for january on availableDays column for dev project type',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(2).props().onChange({target:{value:"dev"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__availableDays').at(0).text()).toEqual("75")
    })

    it('should show a value of 25 for january on availableDays column for ergo project type',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(2).props().onChange({target:{value:"ergo"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__availableDays').at(0).text()).toEqual("25")
    })

    it('should show a monthly value of 20 for february on the graph for CA production metric',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({target:{value:"CA"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(20)
    })

    it('should show a monthly value of 700 for february on the graph for TJM production metric',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({target:{value:"TJM"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(700)
    })

    it('should show a monthly value of 23 for february on the graph for available days production metric',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({target:{value:"availableDays"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(23)
    })

    it('should show a monthly value of 21 for february on the graph for production days production metric',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({target:{value:"productionDays"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(21)
    })

    it('should show a monthly value of 4 for february on the graph for inter production days production metric',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({target:{value:"interProductionDays"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual(4)
    })

    it('should show a monthly value of 91.30 for february on the graph for TO production metric',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('FilterSelector').at(3).props().onChange({target:{value:"TO"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('Bar').props().data.datasets[1].data[1]).toEqual("91.30")
    })


})