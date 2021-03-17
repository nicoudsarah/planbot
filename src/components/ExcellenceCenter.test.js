import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from "react-dom/test-utils";

import ExcellenceCenter from "./ExcellenceCenter"
import LabelSelect from "./LabelSelect";

describe('ExcellenceCenter', () =>{


    it('should display the excellence center section title', () => {
        const ExcellenceCenterWrapperObject = shallow(<ExcellenceCenter />);
        const ExcellenceCenterTitleText = ExcellenceCenterWrapperObject.find('.excellence-center__title').text();
        expect(ExcellenceCenterTitleText).toEqual("Business Intelligency - CE");
    });

    it('should show a value of 69000 for january on CA column for Lyon excellence center',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
             ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
             ExcellenceCenterWrapperObject.find('LabelSelect').at(0).props().onChange({target:{value:"lyon"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual("69000")
    })

    it('should show a value of 38000 for january on CA column for Grenoble excellence center',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('LabelSelect').at(0).props().onChange({target:{value:"grenoble"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual("38000")
    })

    it('should show a value of 107000 for january on CA column for all excellence centers',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('LabelSelect').at(0).props().onChange({target:{value:"all"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__CA').at(0).text()).toEqual("107000")
    })

    it('should show a value of 2021 for january on TJM column for year 2021',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('LabelSelect').at(1).props().onChange({target:{value:"2021"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__TJM').at(0).text()).toEqual("2021")
    })

    it('should show a value of 2020 for january on TJM column for year 2020',async () => {
        let ExcellenceCenterWrapperObject
        await act(async () => {
            ExcellenceCenterWrapperObject = await mount(<ExcellenceCenter />);
            ExcellenceCenterWrapperObject.find('LabelSelect').at(1).props().onChange({target:{value:"2020"}})
        });

        ExcellenceCenterWrapperObject.update()
        expect(ExcellenceCenterWrapperObject.find('.ExcellenceCenterTable__row-item__TJM').at(0).text()).toEqual("2020")
    })
})