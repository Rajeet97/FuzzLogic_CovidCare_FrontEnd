import React from 'react';
import Register from '../components/user/register.component';
import {shallow, mount} from 'enzyme';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import mockAxios from 'axios';
import { required } from '../components/user/register.component';
import Authservice from '../services/auth.service';

let wrapper; 
beforeEach(() => {
    wrapper = shallow(<Register/>);
    mockAxios.reset();
});

describe('Registration form and its elements', () => {
    it('should render one Form', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });
    it('should render one button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should render 4 label(s)', () => {
        expect(wrapper.find('label')).toHaveLength(4);
    });
    it('should render 4 Input Fields', () => {
        expect(wrapper.find(Input)).toHaveLength(4);
    });
});

describe('Register form elements name verification', () => {
    it('renders label with prop Htmlfor Fullname', () => {
        expect(wrapper.find('label').at(0).props().htmlFor).toEqual("fullname");
    });
    it('renders Input with prop name Fullname', () => {
        expect(wrapper.find(Input).at(0).props().name).toEqual("fullname");
    });
    it('renders label with prop Htmlfor username', () => {
        expect(wrapper.find('label').at(1).props().htmlFor).toEqual("username");
    });
    it('renders Input with prop name username', () => {
        expect(wrapper.find(Input).at(1).props().name).toEqual("username");
    });
    it('renders label with Htmlfor prop that matches email', () => {
        expect(wrapper.find('label').at(2).props().htmlFor).toEqual("email");
    });
    it('renders Input with username', () => {
        expect(wrapper.find(Input).at(2).props().name).toEqual("email");
    });
    it('renders label with Htmlfor prop that matches password', () => {
        expect(wrapper.find('label').at(3).props().htmlFor).toEqual("password");
    });
    it('renders Input with username', () => {
        expect(wrapper.find(Input).at(3).props().name).toEqual("password");
    });
    it('renders Button with classname Primary Button', () => {
        expect(wrapper.find('button').at(0).hasClass('btn-success')).toEqual(true);
    });
});

describe('Registration form, states and fields check', ()=>{
    it('has the initial state of username, password to empty', () => {
       
        
        expect(wrapper.state().email).toEqual("");
        expect(wrapper.state().password).toEqual("");
    });

    it('checks Fullname textfield state with onChange',()=>{
        expect(wrapper.state('fullname')).toEqual("");
        wrapper.find(Input).at(0).simulate('change', 
        {
            target: {
                name: 'fullname',
                value: 'Anmol Koirala'
            }
        }); 
        expect(wrapper.state('fullname')).toEqual('Anmol Koirala'); 
    });

    it('checks Username textfield state with onChange',()=>{
        expect(wrapper.state('username')).toEqual("");
        wrapper.find(Input).at(1).simulate('change', 
        {
            target: {
                name: 'username',
                value: 'anmolk'
            }
        });
        expect(wrapper.state('username')).toEqual('anmolk'); 
    });
    it('checks Email field state with onChange',()=>{
        expect(wrapper.state('email')).toEqual("");
        wrapper.find(Input).at(2).simulate('change', 
        {
            target: {
                name: 'email',
                value: 'anmolk@gmail.com'
            }
        });
        expect(wrapper.state('email')).toEqual('anmolk@gmail.com'); 
    });
    it('checks Password field state with onChange',()=>{
        expect(wrapper.state('password')).toEqual("");
        wrapper.find(Input).at(3).simulate('change', 
        {
            target: {
                name: 'password',
                value: 'anmolk'
            }
        });
        expect(wrapper.state('password')).toEqual('anmolk'); 
    });
});

describe('checks Registration onSubmit prop', ()=>{
    it('calls onSubmit prop function with jest mock function', () => {
        const onSubmit                     = jest.fn();
        Register.prototype.handleRegister  = onSubmit;
        const newWrap                      = shallow(<Register/>);
        newWrap.find(Form).simulate('submit');

        expect(onSubmit).toBeCalledTimes(1); 
    });
});

describe('check Axios Registration post API', ()=>{
    it('renders mock axios to check Registration post request', () => {
        let catchFn = jest.fn(),thenFn = jest.fn();
        const Reg   = Authservice.register("Anmol Koirala","anmolk","anmolk@gmail.com","anmolk")
        .then(thenFn).catch(catchFn);
        
        expect(mockAxios.post).toBeCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:8080/api/auth/signup",
        {"fullname": "Anmol Koirala","username": "anmolk", "email": "anmolk@gmail.com","password": "anmolk"});

        let responseObj = { data: "Registration successfull!" };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({"config": {}, "data": "Registration successfull!", 
        "headers": {}, "status": 200, "statusText": "OK"});
        expect(catchFn).not.toHaveBeenCalled();
    });
});

