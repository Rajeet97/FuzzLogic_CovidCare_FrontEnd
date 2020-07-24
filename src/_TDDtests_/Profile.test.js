import React from 'react';
import Profile from '../components/user/profile.component';
import DashNav from '../components/navigation/burger-navigation';
import {shallow, mount, render} from 'enzyme';
import mockAxios from 'axios';
import Userservice from '../services/user.service';

let wrapper; 
//setting up mock props data for profile class
const user = {
    fullname: 'John Doe',
    email: 'johndoe@gmail.com',
    username: 'johndoe',
    contact: '98978787878',
    address: 'gausala',
  }

beforeEach(() => {
    const Didmount              = jest.fn();
    Profile.prototype.componentDidMount = Didmount;
    wrapper = shallow(<Profile/>);
    mockAxios.reset();
});

describe('Profile page', () => {
it ('accepts user mock props', () => {
    const wrappers = mount(<Profile user={user} />);
    expect(wrappers.props().user).toEqual(user);
  });
});

describe('When dummy profile details are set in state', () => {
    it ('component values will change at input element of form', () => {
        //setting state of user profile details
        wrapper.setState(user);
        //checking the form input type values for matching data
        expect(wrapper.find('input').at(0).props().value).toEqual(user.fullname);
        expect(wrapper.find('input').at(1).props().value).toEqual(user.username);
        expect(wrapper.find('input').at(2).props().value).toEqual(user.email);
        expect(wrapper.find('input').at(3).props().value).toEqual(user.contact);
        expect(wrapper.find('input').at(4).props().value).toEqual(user.address);
      });
});

describe('When profile page loads', () => {
    it('renders the Component correctly -snapshot-', () => {
        const data = render(<Profile/>);
        expect(data).toMatchSnapshot();
    });
});

describe('Profile page will always', () => {
it('call componentDidMount when loaded', () => {
    const mounted                    = jest.fn();
    Profile.prototype.componentDidMount = mounted;
    expect(mounted).toBeCalledTimes(0)
    const wrapper = shallow(<Profile />)
    expect(mounted).toBeCalledTimes(1)
  });
}); 

describe('Profile Component', () => {
    it('renders Burger Navigation component', () => {
      const wrapper = shallow(<Profile/>);
      expect(wrapper.containsMatchingElement(<DashNav/>)).toEqual(true);
    }); 
});

describe('Profile Page', () => {
    it('renders a GIF in top', () => {
      expect(wrapper.find('img').props().alt).toEqual('profile-one');
    }); 
});
 
describe('Profile form and elements count checkup', () => {
    it('should render one Form', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });
    it('should render one button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should render 5 label(s)', () => {
        expect(wrapper.find('label')).toHaveLength(5);
    });
    it('should render 5 Input Fields', () => {
        expect(wrapper.find('input')).toHaveLength(5);
    });
    it('should render one success <Div> with alert success class', () => {
        expect(wrapper.find('.alert-success')).toHaveLength(1);
    });
    it('should render one success <Div> with alert danger class', () => {
        expect(wrapper.find('.alert-danger')).toHaveLength(1);
    });
});

describe('Elements Name verification', () => {
    it('renders label with prop Htmlfor fullname', () => {
        expect(wrapper.find('label').at(0).props().htmlFor).toEqual("fullname");
    });
    it('renders Input with prop name fullname', () => {
        expect(wrapper.find('input').at(0).props().name).toEqual("fullname");
    });
    it('renders label with Htmlfor prop that matches username', () => {
        expect(wrapper.find('label').at(1).props().htmlFor).toEqual("username");
    });
    it('renders Input with username', () => {
        expect(wrapper.find('input').at(1).props().name).toEqual("username");
    });
    it('renders label with Htmlfor prop that matches email', () => {
        expect(wrapper.find('label').at(2).props().htmlFor).toEqual("email");
    });
    it('renders Input with email', () => {
        expect(wrapper.find('input').at(2).props().name).toEqual("email");
    });
    it('renders label with Htmlfor prop that matches contact', () => {
        expect(wrapper.find('label').at(3).props().htmlFor).toEqual("contact");
    });
    it('renders Input with contact', () => {
        expect(wrapper.find('input').at(3).props().name).toEqual("contact");
    });
    it('renders label with Htmlfor prop that matches address', () => {
        expect(wrapper.find('label').at(4).props().htmlFor).toEqual("address");
    });
    it('renders Input with address', () => {
        expect(wrapper.find('input').at(4).props().name).toEqual("address");
    });
    it('renders Button with Button with text Update', () => {
        expect(wrapper.find('button').text()).toEqual('Update');
    });
});


describe('Profile form, state and fields', ()=>{
    it('has the same initial values as our dummy data', () => {
        //setting state as data is already passed from db ready to be updated
        wrapper.setState(user);
        expect(wrapper.state().fullname).toEqual(user.fullname);
        expect(wrapper.state().username).toEqual(user.username);
        expect(wrapper.state().email).toEqual(user.email);
        expect(wrapper.state().contact).toEqual(user.contact);
        expect(wrapper.state().address).toEqual(user.address);
    });

    it('checks fullname input field with onChange',()=>{
        wrapper.find('input').at(0).simulate('change', 
        {
            target: {
                name: 'fullname',
                value: 'anmolk'
            }
        }); 
        expect(wrapper.state('fullname')).toEqual('anmolk'); 
    });

    it('checks address field with onChange',()=>{
        wrapper.find('input').at(4).simulate('change', 
        {
            target: {
                name: 'address',
                value: 'Ratopul'
            }
        });
        expect(wrapper.state('address')).toEqual('Ratopul'); 
   });
});

describe('checks onClick prop of button', ()=>{
    it('call onClick prop function with jest mock function', () => {
        const onClick                  = jest.fn();
        Profile.prototype.handleUpdate = onClick;
        const newWrap                  = shallow(<Profile/>);
        newWrap.find('button').simulate('click');

        expect(onClick).toBeCalledTimes(1); 
    });
});

describe('check Axios Profile update API', ()=>{
    it('renders mock axios to check profile update request', () => {
        let catchFn = jest.fn(),thenFn = jest.fn();
        const profile = Userservice.getUserUpdate("5eeb2e57d946ec14943fd4dd",user).then(thenFn).catch(catchFn);
        expect(mockAxios.put).toBeCalledTimes(1);
        expect(mockAxios.put).toHaveBeenCalledWith("http://localhost:8080/api/user/5eeb2e57d946ec14943fd4dd", 
        {   "address": "gausala",
            "contact": "98978787878",
            "email": "johndoe@gmail.com",
            "fullname": "John Doe",
            "username": "johndoe"}, {"headers" : {}});

        let responseObj = {"config": {}, "data": "User data updated", "headers": {}, "status": 200, "statusText": "OK"};
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({"config": {}, "data": "User data updated", "headers": {}, "status": 200, "statusText": "OK"});
        expect(catchFn).not.toHaveBeenCalled();
    });
});


