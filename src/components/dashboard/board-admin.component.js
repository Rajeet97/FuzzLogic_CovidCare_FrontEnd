import React, { Component } from "react";

import UserService from "../../services/user.service";
import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"


export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div><Navigation/>
      <BurgerNavigation/>
   
      <div className="container mt-3">
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
      </div>
      </div>
    );
  }
}



