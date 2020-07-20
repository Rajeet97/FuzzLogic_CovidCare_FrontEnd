import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import "./profile.css";
import ll from "../images/source.gif";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin      = this.handleLogin.bind(this);
    this.required         = this.required.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
//bind yaha garya cha aru jastai
    this.required = this.required.bind(this);

    this.state = {
      username: "",
      password: "",
      islogin:false,
      loading: false,
      message: ""
    };
  }

  required(value){
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.setState({
            islogin: true
          });
          this.props.history.push("/profile");
          window.location.reload();
         
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="container extraac">
        <div className="row">
      <div className="col-md-6">
        <img className="img-fluid" alt="login-one" src={ll}/></div>
      <div className="col-md-6">
      <div className="user_card">
        <img className="rounded mx-auto d-block sizing" alt="login-two" src={logo}/>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[this.required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[this.required]}
              />
            </div> 

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
            
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        
        <div className="mt-4">
              <div className="d-flex justify-content-center links">
                If you don't have account.
                </div>
                <div className="d-flex justify-content-center links">
                  <NavLink to={"/register"} className="btn btn-dark btn-block">Register  </NavLink>
              </div> 
              </div>        
            </div>
      </div>
      </div>
      </div>
    );
  }
}
