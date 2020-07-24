import React from 'react';
import Login from '../components/user/login.component';
import {shallow, mount} from 'enzyme';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import mockAxios from 'axios';
import Authservice from '../services/auth.service';
//import { render, fireEvent } from "@testing-library/react";


let wrapper; 
beforeEach(() => {
    wrapper = shallow(<Login/>);
    mockAxios.reset();
});
const user = {
    username: '',
    password: '',
    islogin:false,
    loading: false
  }
 
describe('Login form and elements count checkup', () => {
    it('should render one Form', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });
    it('should render one button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should render two label(s)', () => {
        expect(wrapper.find('label')).toHaveLength(2);
    });
    it('should render 2 Input Fields', () => {
        expect(wrapper.find(Input)).toHaveLength(2);
    });
});

describe('Elements Name verification', () => {
    it('renders label with prop Htmlfor Username', () => {
        expect(wrapper.find('label').at(0).props().htmlFor).toEqual("username");
    });
    it('renders Input with prop name username', () => {
        expect(wrapper.find(Input).at(0).props().name).toEqual("username");
    });
    it('renders label with Htmlfor prop that matches password', () => {
        expect(wrapper.find('label').at(1).props().htmlFor).toEqual("password");
    });
    it('renders Input with username', () => {
        expect(wrapper.find(Input).at(1).props().name).toEqual("password");
    });
    it('renders Button with classname Primary Button', () => {
        expect(wrapper.find('button').at(0).hasClass('btn-primary')).toEqual(true);
    });
});

describe('Login form, state and fields check', ()=>{
    it('has the initial state of username, password to empty', () => {
        expect(wrapper.state().username).toEqual("");
        expect(wrapper.state().password).toEqual("");
    });
    it('checks username textfield with onChange',()=>{
        wrapper.find(Input).at(0).simulate('change', 
        {
            target: {
                name: 'username',
                value: 'anmolk'
            }
        }); 
        expect(wrapper.state('username')).toEqual('anmolk'); 
    });

    it('checks password field with onChange',()=>{
        wrapper.find(Input).at(1).simulate('change', 
        {
            target: {
                name: 'password',
                value: 'anmolk'
            }
        });
        expect(wrapper.state('password')).toEqual('anmolk'); 
    });
});

describe('checks onSubmit prop of Login form', ()=>{
    it('calls onSubmit prop function with jest mock function', () => {
        const onSubmit              = jest.fn();
        Login.prototype.handleLogin = onSubmit;
        const newWrap               = shallow(<Login/>);
        newWrap.find(Form).simulate('submit');

        expect(onSubmit).toBeCalledTimes(1); 
    });
});

describe('check Axios Login post API', ()=>{
    it('renders mock axios to check login post request', () => {
        let catchFn = jest.fn(),thenFn = jest.fn();
        const login = Authservice.login("anmolk","anmol").then(thenFn).catch(catchFn);
        expect(mockAxios.post).toBeCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:8080/api/auth/signin", {"username": "anmolk", "password": "anmol"});

        let responseObj = { data: "logged in successfully" };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith("logged in successfully");
        expect(catchFn).not.toHaveBeenCalled();
    });
});
