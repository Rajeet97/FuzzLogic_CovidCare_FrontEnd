import React, { Component } from "react";
import AuthService from "../../services/auth.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import UserService from "../../services/user.service";
import "./profile.css"
import prof from "../images/developer.gif";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);

    this.state = {
      fullname: "",
      contact: "",
      address: "",
      email: "",
      username: "",
      successmessage: "",
      errormessage: "",
      currentUser: AuthService.getCurrentUser()
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


  componentDidMount() {
    UserService.getUserById(this.state.currentUser.id).then((response) => {
      this.setState({
        fullname: response.data.fullname,
        address: response.data.address,
        contact: response.data.contact,
        email: response.data.email,
        username: response.data.username,
      })
      // console.log(response.data)
    });
  }


  handleUpdate(e) {
    e.preventDefault();

    const data = {
      fullname: this.state.fullname,
      address: this.state.address,
      contact: this.state.contact,

    };

    UserService.getUserUpdate(this.state.currentUser.id, data)
      .then(response => {
        // handle success
        this.setState({
          successmessage: response.data.message
        })

        setTimeout(function () {
          window.location.reload()
        }, 3000);

      }).catch(error => {
        // handle error
        this.setState({
          errormessage: "Something went wrong"
        })

      })

  }


  render() {

    return (
      <div data-testid="main-profilebody">
        <BurgerNavigation data-testid="header-navigation" />
        <div className="container extraac">
          <form>
            <h2 className="text-center custom-container">User Information</h2>
            <img src={prof} alt="profile-one" className="rounded mx-auto d-block sizing" />
            <div className="alert-section-message">

              <div className="alert alert-success" style={{ display: this.state.successmessage !== "" ? "" : "none" }}>
                {this.state.successmessage}
              </div>
              <div className="alert alert-danger" style={{ display: this.state.errormessage !== "" ? "" : "none" }}>
                {this.state.errormessage}
              </div>
            </div  >
            <div className="user_card">
              <div className="form-group">
                <label htmlFor='fullname'>Full Name</label>
                <input
                  type='text'
                  name='fullname'
                  id='fullname'
                  className="form-control"
                  value={this.state.fullname}
                  onChange={this.onChangeFullname} />
              </div>

              <div className="form-group">
                <label htmlFor='username'>User Name</label>
                <input
                  type='text'
                  name='username'
                  className="form-control"
                  id='fullname'
                  value={this.state.username} disabled />
              </div>


              <div className="form-group">
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className="form-control"
                  value={this.state.email} disabled />
              </div>


              <div className="form-group">

                <label htmlFor='contact'>Contact</label>
                <input
                  type='text'
                  name='contact'
                  className="form-control"
                  id='lastName'
                  value={this.state.contact} onChange={this.onChangeContact} />
              </div>


              <div className="form-group">

                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  className="form-control"
                  value={this.state.address} onChange={this.onChangeAddress} />
              </div>
              <button
                type="button"
                onClick={this.handleUpdate}
                className="btn btn-outline-success btn-lg btn-block">Update</button>
            </div>


          </form>


        </div>


      </div>

    );
  }
}
