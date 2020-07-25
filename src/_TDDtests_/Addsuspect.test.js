import React from 'react';
import Addsuspect from '../components/suspect/add-suspect';
import {shallow, mount, render} from 'enzyme';
import mockAxios from 'axios';
import Form from "react-validation/build/form";
import TextArea from "react-validation/build/textarea";
import Input from "react-validation/build/input";
import DashNav from '../components/navigation/burger-navigation';
import SuspectDataService from "../services/suspect.service";

let wrapper; 
const user = { 
    suspectname:"Dil Raj",
    suspectage:24,
    suspectcontact:"no idea",
    suspectaddress:"Bhimsengola",
    contact:"98765443120",
    camefrom:"I think he came from abroad",
    complaintdescription:"No additional description.",
    currentusername:"anmolk"
  }

beforeEach(() => {
    const Didmount              = jest.fn();
    Addsuspect.prototype.componentDidMount = Didmount;
    wrapper = shallow(<Addsuspect />);
    mockAxios.reset();
});

describe('When Add Suspect page loads', () => {
    it('renders the Component correctly -snapshot-', () => {
        const data = render(<Addsuspect/>);
        expect(data).toMatchSnapshot();
    });
});

describe('Add Suspect page will always', () => {
    it('call componentDidMount when loaded', () => {
        const mounted                    = jest.fn();
        Addsuspect.prototype.componentDidMount = mounted;
        expect(mounted).toBeCalledTimes(0)
        const wrapper = shallow(<Addsuspect />)
        expect(mounted).toBeCalledTimes(1)
      });
}); 

describe('Add Suspect Component', () => {
    it('renders Burger Navigation component', () => {
      const wrapper = shallow(<Addsuspect/>);
      expect(wrapper.containsMatchingElement(<DashNav/>)).toEqual(true);
    }); 
});

describe('When dummy Suspect details are set in state', () => {
    it ('component values will change at input element of form', () => {
        wrapper.setState(user);
        expect(wrapper.find(Input).at(0).props().value).toEqual(user.suspectname);
        expect(wrapper.find(Input).at(1).props().value).toEqual(user.suspectage);
        expect(wrapper.find(Input).at(2).props().value).toEqual(user.suspectaddress);
        expect(wrapper.find(Input).at(3).props().value).toEqual(user.suspectcontact);
        expect(wrapper.find(Input).at(4).props().value).toEqual(user.camefrom);
        expect(wrapper.find(Input).at(5).props().value).toEqual(user.contact);
        expect(wrapper.find(TextArea).props().value).toEqual(user.complaintdescription);
      });
});

describe('Add suspect Page', () => {
    it('renders a GIF in top', () => {
      expect(wrapper.find('img').props().alt).toEqual('suspect-one');
    }); 
});

describe('Profile form and elements count checkup', () => {
    it('should render one Form', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });
    it('should render one button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should render 7 label(s)', () => {
        expect(wrapper.find('label')).toHaveLength(7);
    });
    it('should render 7 Input Fields', () => {
        expect(wrapper.find(Input)).toHaveLength(6);
    });
    it('should render 1 TextArea Field', () => {
        expect(wrapper.find(TextArea)).toHaveLength(1);
    });
});

describe('Elements Name verification', () => {
    it('renders label with prop Htmlfor suspectname', () => {
        expect(wrapper.find('label').at(0).props().htmlFor).toEqual("suspectname");
    });
    it('renders Input with prop name suspectname', () => {
        expect(wrapper.find(Input).at(0).props().name).toEqual("suspectname");
    });
    it('renders label with Htmlfor prop that matches suspectage', () => {
        expect(wrapper.find('label').at(1).props().htmlFor).toEqual("suspectage");
    });
    it('renders Input with suspectage', () => {
        expect(wrapper.find(Input).at(1).props().name).toEqual("suspectage");
    });
    it('renders label with Htmlfor prop that matches suspectaddress', () => {
        expect(wrapper.find('label').at(2).props().htmlFor).toEqual("suspectaddress");
    });
    it('renders Input with email', () => {
        expect(wrapper.find(Input).at(2).props().name).toEqual("suspectaddress");
    });
    it('renders label with Htmlfor prop that matches suspectcontact', () => {
        expect(wrapper.find('label').at(3).props().htmlFor).toEqual("suspectcontact");
    });
    it('renders Input with suspectcontact', () => {
        expect(wrapper.find(Input).at(3).props().name).toEqual("suspectcontact");
    });
    it('renders label with Htmlfor prop that matches camefrom', () => {
        expect(wrapper.find('label').at(4).props().htmlFor).toEqual("camefrom");
    });
    it('renders Input with prop name camefrom', () => {
        expect(wrapper.find(Input).at(4).props().name).toEqual("camefrom");
    });
    it('renders label with Htmlfor prop that matches contact', () => {
        expect(wrapper.find('label').at(5).props().htmlFor).toEqual("contact");
    });
    it('renders Input with prop name contact', () => {
        expect(wrapper.find(Input).at(5).props().name).toEqual("contact");
    });
    it('renders label with Htmlfor prop that matches complaintdescription', () => {
        expect(wrapper.find('label').at(6).props().htmlFor).toEqual("complaintdescription");
    });
    it('renders Textarea with prop name complaintdescription', () => {
        expect(wrapper.find(TextArea).props().name).toEqual("complaintdescription");
    });
    it('renders Button with Button with text Submit', () => {
        expect(wrapper.find('button').text()).toEqual('Submit');
    });
});

describe('Login form, state and fields check', ()=>{
    it('has the initial state of username, password to empty', () => {
        expect(wrapper.state().suspectname).toEqual("");
        expect(wrapper.state().suspectage).toEqual("");
        expect(wrapper.state().suspectaddress).toEqual("");
        expect(wrapper.state().suspectcontact).toEqual("");
        expect(wrapper.state().camefrom).toEqual("");
        expect(wrapper.state().contact).toEqual("");
        expect(wrapper.state().complaintdescription).toEqual("");
    });
    it('checks Suspect textfield with onChange',()=>{
        wrapper.find(Input).at(0).simulate('change', 
        {
            target: {
                name: 'suspectname',
                value: 'Shiva'
            }
        }); 
        expect(wrapper.state('suspectname')).toEqual('Shiva'); 
    });

    it('checks Suspectaddress field with onChange',()=>{
        wrapper.find(Input).at(2).simulate('change', 
        {
            target: {
                name: 'suspectaddress',
                value: 'Hattisar'
            }
        });
        expect(wrapper.state('suspectaddress')).toEqual('Hattisar'); 
    });

    it('checks Complaint Description field with onChange',()=>{
        wrapper.find(TextArea).simulate('change', 
        {
            target: {
                name: 'complaintdescription',
                value: 'I think he was looking sick'
            }
        });
        expect(wrapper.state('complaintdescription')).toEqual('I think he was looking sick'); 
    });
});

describe('checks onSubmit prop of addsuspect form', ()=>{
    it('calls onSubmit prop function with jest mock function', () => {
        const onSubmit                     = jest.fn();
        Addsuspect.prototype.handleSuspect = onSubmit;
        const newWrap                      = shallow(<Addsuspect/>);
        newWrap.find(Form).simulate('submit');

        expect(onSubmit).toBeCalledTimes(1); 
    });
});

describe('check Axios Add Suspect data post API', ()=>{
    it('renders mock axios to check Add Suspect post request', () => {
        let catchFn = jest.fn(),thenFn = jest.fn();
        const login = SuspectDataService.create(user).then(thenFn).catch(catchFn);
        expect(mockAxios.post).toBeCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:8080/api/suspects", {
            "camefrom": "I think he came from abroad",
            "complaintdescription": "No additional description.",
            "contact": "98765443120",
            "currentusername": "anmolk",
            "suspectaddress": "Bhimsengola",
            "suspectage": 24,
            "suspectcontact": "no idea",
            "suspectname": "Dil Raj",
          },
          {"headers": {}});

        let responseObj = { data: "Suspect Added to the list" };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({"config": {}, "data": "Suspect Added to the list", "headers": {}, "status": 200, "statusText": "OK"});
        expect(catchFn).not.toHaveBeenCalled();
    });
});
