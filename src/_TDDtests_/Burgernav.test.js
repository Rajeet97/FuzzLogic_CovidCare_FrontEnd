import React from 'react';
import BNavigation from '../components/navigation/burger-navigation';
import Newsfeedeer from '../containers/newsfeeds/newsfeeds';
import {shallow, mount, render} from 'enzyme';
import {
    Nav, Navbar, NavDropdown,
    //  DropdownButton ,Dropdown
  } from "react-bootstrap";

let wrapper; 
const user = {
    showModeratorBoard: false,
    showAdminBoard: false,
    currentUser: "anmol"
}
const admin = {
    showAdminBoard: true,
    currentUser: "ououo"
}
beforeEach(() => {
    wrapper = shallow(<BNavigation/>);
});

describe('When Navigation loads', () => {
    it('renders the Component correctly -snapshot-', () => {
        const data = render(<BNavigation/>);
        expect(data).toMatchSnapshot();
    });
});

describe('Dashboard Page', () => {
    it('renders a logo on top', () => {
      expect(wrapper.find('img').props().alt).toEqual('burger-one');
    }); 
});

describe('Burger Navigation will always', () => {
    it('call componentDidMount when loaded', () => {
        const mounted                           = jest.fn();
        BNavigation.prototype.componentDidMount = mounted;
        expect(mounted).toBeCalledTimes(0)
        const wrapper = shallow(<BNavigation/>)
        expect(mounted).toBeCalledTimes(1)
      });
}); 


describe('If user is general', () => {
    it('render 3 single simple Link and 4 Nav dropdown as Navigation', () => {
        wrapper.setState(user);
        expect(wrapper.find(Nav.Link)).toHaveLength(3);
        expect(wrapper.find(NavDropdown)).toHaveLength(4);
    });
}); 

describe('If user is admin', () => {
    it('render 6 single simple Link and 2 Nav dropdown with title - services/expenses', () => {
        wrapper.setState(admin);
        expect(wrapper.find(Nav.Link)).toHaveLength(6);
        expect(wrapper.find(NavDropdown).at(0).props().title).toEqual("Services");
        expect(wrapper.find(NavDropdown).at(1).props().title).toEqual("Expenses");
    });
});

describe('If logout nav item link is clicked', () => {
    it('calls logout mock function is called', () => {
        const logoutFn               = jest.fn();
        BNavigation.prototype.logOut = logoutFn;
        const newWrap                  = shallow(<BNavigation/>);
        //pass the type of user via state inorder to find the logout link and simulate click
        newWrap.setState(user);
        newWrap.find('.logout').simulate('click');
        expect(logoutFn).toBeCalledTimes(1); 
    });
});

describe('If user clicks on first Nav Link', () => {
    it('district link is found in href prop', () => {
        wrapper.setState(user);
        expect(wrapper.find(Nav.Link).at(0).props().href).toEqual("/newsfeed");
    });
});
