import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, mount, render} from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

configure({ adapter: new Adapter() });

const myWork = [
    {
        'title': "Work Example",
        'image': {
            'desc': "Example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
    },
    {
        'title': "Work Example",
        'image': {
            'desc': "Example screenshot of a project involving chemistry",
            'src': "images/example2.png",
            'comment': ""
        }
    }
]

describe("ExampleWork component", () => {
    let component = shallow(<ExampleWork work={myWork} />);

    it("Should be a 'section' element", () => {
        expect(component.type()).toEqual('section');
    });

    it("Should contain as many children as there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    })
});

describe("ExampleWorkBubble component", () => {
    let component = shallow(<ExampleWorkBubble example={myWork[1]} />);
    let images = component.find("img");

    it("Should contain a single 'img' element", () => {
        expect(images.length).toEqual(1);
    });

    it("Should have the src set correctly", () => {
        expect(images.getElement().props.src).toEqual(myWork[1].image.src);
    });
});