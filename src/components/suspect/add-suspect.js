import React, { Component } from "react";
import SuspectDataService from "../../services/suspect.service";
import UserService from "../../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import suspect from "../images/suspect.png";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class AddSuspect extends Component {
  constructor(props) {
    super(props);
    this.onChangeSuspectname = this.onChangeSuspectname.bind(this);
    this.onChangeSuspectAddress = this.onChangeSuspectAddress.bind(this);
    this.onChangeSuspectContact = this.onChangeSuspectContact.bind(this);
    this.onChangeSuspectage = this.onChangeSuspectage.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeComplaintDescription = this.onChangeComplaintDescription.bind(this);
    this.onChangeCamefrom = this.onChangeCamefrom.bind(this);

    this.handleSuspect = this.handleSuspect.bind(this);

    this.state = {
      suspectname: "",
      suspectaddress: "",
      suspectcontact: "",
      suspectage: "",
      contact: "",
      complaintdescription: "",
      camefrom: "",
      errormessage: "",
      rightcontent: "",
      wrongcontent: "",
      successful: false,
      message: "",
      submitted: false,
      currentUser: AuthService.getCurrentUser(),
    };
  }

  onChangeSuspectname(e) {
    this.setState({
      suspectname: e.target.value
    });
  }

  onChangeSuspectAddress(e) {
    this.setState({
      suspectaddress: e.target.value
    });
  }

  onChangeSuspectage(e) {
    this.setState({
      suspectage: e.target.value
    });
  }
  onChangeContact(e) {
    this.setState({
      contact: e.target.value
    });
  }

  onChangeSuspectContact(e) {
    this.setState({
      suspectcontact: e.target.value
    });
  }

  onChangeComplaintDescription(e) {
    this.setState({
      complaintdescription: e.target.value
    });
  }

  onChangeCamefrom(e) {
    this.setState({
      camefrom: e.target.value
    });
  }



  handleSuspect(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      var data = {
        suspectname: this.state.suspectname,
        suspectage: this.state.suspectage,
        suspectcontact: this.state.suspectcontact,
        suspectaddress: this.state.suspectaddress,
        contact: this.state.contact,
        camefrom: this.state.camefrom,
        complaintdescription: this.state.complaintdescription,
        currentusername: this.state.currentUser.username,
      };
      SuspectDataService.create(data)
        .then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });
            setTimeout(function () {
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
    if (this.state.wrongcontent) {
      return <div> <BurgerNavigation /> <div className="container custom-container">{this.state.wrongcontent}</div></div>

    }
    else {
      return (
        <div> <BurgerNavigation />
          <div className="container custom-container">
            <h2 className="text-center">Inform about any suspected person here.</h2>
            <img src={suspect} alt="suspect-one" className="rounded mx-auto d-block img-fluid" />
            <div className="col-md-12 user_card">
              <Form
                onSubmit={this.handleSuspect}
                ref={c => {
                  this.form = c;
                }}>
                {!this.state.successful && (

                  <div>
                    <div className="form-group">
                      <label htmlFor="suspectname">Full Name of Suspect</label>
                      <Input
                        type="text"
                        className="form-control"
                        id="suspectname"
                        value={this.state.suspectname}
                        onChange={this.onChangeSuspectname}
                        name="suspectname"
                        validations={[required]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="suspectage">Suspect Age(Approximate)</label>
                      <Input
                        type="number"
                        className="form-control"
                        id="suspectage"
                        value={this.state.suspectage}
                        onChange={this.onChangeSuspectage}
                        name="suspectage"
                        validations={[required]}
                      />
                    </div>


                    <div className="form-group">
                      <label htmlFor="suspectaddress">Suspect Address</label>
                      <Input
                        type="text"
                        className="form-control"
                        id="suspectaddress"
                        required
                        value={this.state.suspectaddress}
                        onChange={this.onChangeSuspectAddress}
                        name="suspectaddress"
                        validations={[required]}

                      />
                    </div>


                    <div className="form-group">
                      <label htmlFor="suspectcontact">Suspect Contact Number</label>
                      <Input
                        type="text"
                        className="form-control"
                        id="suspectcontact"
                        required
                        value={this.state.suspectcontact}
                        onChange={this.onChangeSuspectContact}
                        name="suspectcontact"
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="camefrom">Did suspect return from aboard or been residing in Nepal?</label>
                      <Input
                        type="text"
                        className="form-control"
                        id="camefrom"
                        required
                        value={this.state.camefrom}
                        onChange={this.onChangeCamefrom}
                        name="camefrom"
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact">Your Contact Number</label>
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
                      <label htmlFor="complaintdescription">Additional Description</label>
                      <TextArea
                        type="text"
                        className="form-control"
                        id="complaintdescription"
                        required
                        value={this.state.complaintdescription}
                        onChange={this.onChangeComplaintDescription}
                        name="complaintdescription"
                        validations={[required]}/>
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