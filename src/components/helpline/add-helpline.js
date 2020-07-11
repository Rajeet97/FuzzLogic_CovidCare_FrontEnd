import React, { Component } from "react";
import HelplineDataService from "../../services/helpline.service";
import UserService from "../../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import gg from "../images/help.gif";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"



const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default class AddHelpline extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeAddress= this.onChangeAddress.bind(this);
    this.onChangeContact= this.onChangeContact.bind(this);
    this.onChangeDescription= this.onChangeDescription.bind(this);

    this.handleHelpline = this.handleHelpline.bind(this);



    this.state = {
        fullname: "",
        address: "",
        contact: "",
        description: "",
        errormessage:"",
        rightcontent:"",
        wrongcontent:"",
        successful: false,
        message: "",
      submitted: false,
      currentUser: AuthService.getCurrentUser(),

    };
  }

  onChangeFullname(e) {
    this.setState({
        fullname: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
        address: e.target.value
    });
  } 
  onChangeContact(e) {
    this.setState({
        contact: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  

  handleHelpline(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

  
  

    if (this.checkBtn.context._errors.length === 0) {
        var data = {
            fullname: this.state.fullname,
            address: this.state.address,
            contact: this.state.contact,
             description: this.state.description,
             currentusername: this.state.currentUser.username,
          };
          HelplineDataService.create(data)
      .then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          setTimeout(function() {
            window.location.reload()
           }, 3000);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }



  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          rightcontent: response.data
        });
      },
      error => {
        this.setState({
          wrongcontent:
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
      if(this.state.wrongcontent){
      return  <div><BurgerNavigation/> <div className="container custom-container">{this.state.wrongcontent}</div></div>
      }
      else{
    return (
      <div><BurgerNavigation/>
      <div className="container custom-container">
        <h2 className="text-center">Helpline form</h2>
        <p class="text-center">Fill the form below with your problem at description and wait for admin to respond.</p>
        <img src={gg} alt="helpline-one" className="rounded mx-auto d-block sizing"/>
        <div className="col-md-12 user_card">                              
               
            <Form
            onSubmit={this.handleHelpline}
            ref={c => {
              this.form = c;
            }}
          >
               {!this.state.successful && (
       
            <div>
              <div className="form-group">
                <label htmlFor="title">Full Name</label>
                <Input
                  type="text"
                  className="form-control"
                  id="fullname"
                  value={this.state.fullname}
                  onChange={this.onChangeFullname}
                  name="fullname"
                  validations={[required]}

                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Address</label>
                <Input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  name="address"
                  validations={[required]}

                />
              </div>


              <div className="form-group">
                <label htmlFor="title">Contact Number</label>
                <Input
                  type="text"
                  className="form-control"
                  id="contact"
                  required
                  value={this.state.contact}
                  onChange={this.onChangeContact}
                  name="contact"
                  validations={[required]}

                />
              </div>


              <div className="form-group">
                <label htmlFor="title">Description</label>
                <TextArea
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                  validations={[required]}

                />
              </div>



            
              <div className="form-group">
                  <button className="btn btn-success btn-block">Submit</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
            </div>
      </div>
      </div>
      );
    }
}
}