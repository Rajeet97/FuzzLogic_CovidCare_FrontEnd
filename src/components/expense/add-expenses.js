import React, { Component } from "react";
import ExpenseDataService from "../../services/expense.service";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import {
  Form, FormGroup, Label, Input, Button, Alert
} from 'reactstrap'
import $ from 'jquery'



export default class AddExpenses extends Component {
  constructor(props) {
    super(props);


    this.state = {

      totalexpenses: "",
      note: "",
      bill_image: null,
      rightcontent: "",
      wrongcontent: "",
      successmessage: "",
      errormessage: "",
      currentUser: AuthService.getCurrentUser(),
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }

    };
  }



  handleChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value }
    )
  }

  handleImageChange = (e) => {
    this.setState({
      bill_image: e.target.files[0]
    })
  };


  addexpense = (e) => {
    e.preventDefault();


    let form_data = new FormData();
    if (this.state.bill_image) {
      form_data.append('bill_image', this.state.bill_image, this.state.bill_image.name);
    }
    else {
      return (
        this.setState({
          errormessage: "Please choose a image"
        })
      )
    }
    form_data.append('totalexpenses', this.state.totalexpenses);
    form_data.append('note', this.state.note);


    console.log(form_data)
    //    console.log(this.state.config)

    ExpenseDataService.create(form_data)
      .then(response => {
        // handle success
        this.setState({
          successmessage: response.data.message
        })

        setTimeout(function () {
          window.location.reload()
        }, 3000);

      })
      .catch(error => {
        // handle error
        this.setState({
          errormessage: error.response.data.message
        })

      })

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

  componentWillMount() {
    $(document).ready(function () {
      let imagesPreview = function (input, placeToInsertImagePreview) {
        if (input.files) {
          let filesAmount = input.files.length;
          for (var i = 0; i < filesAmount; i++) {
            let reader = new FileReader();
            reader.onload = function (event) {
              $($.parseHTML("<img>"))
                .attr("src", event.target.result)
                .appendTo(placeToInsertImagePreview);
            };
            reader.readAsDataURL(input.files[i]);
          }
        }
      };
      $("#bill_image").on("change", function () {
        imagesPreview(this, "div.preview-images");
      });
    });


  }



  render() {


    if (this.state.wrongcontent) {
      return <div><BurgerNavigation /> <div className="container custom-container">{this.state.wrongcontent}</div></div>
    }
    else {
      return (
        <div><BurgerNavigation />

          <div className="container user_card custom-container" style={{ marginTop: "70px" }}>
            <div className="row">
              <div className="col-md-12">

                <Form>
                  <div className="alert-section-message">
                    <Alert color="success" style={{ display: this.state.successmessage !== "" ? "" : "none" }}>
                      {this.state.successmessage}
                    </Alert>
                    <Alert color="danger" style={{ display: this.state.errormessage !== "" ? "" : "none" }}>
                      {this.state.errormessage}
                    </Alert>
                  </div>
                  <FormGroup>
                    <Label for='totalexpenses'>Total Expenses</Label>
                    <Input type='number' name='totalexpenses' id='totalexpenses'
                      value={this.state.totalexpenses} onChange={this.handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <Label for='note'>Note</Label>


                    {/* <Col sm={10}> */}
                    <Input type='textarea' name='note' id='note'
                      value={this.state.note} onChange={this.handleChange} />
                    {/* </Col> */}
                  </FormGroup>



                  <FormGroup>
                    <Label for='bill_image'>Bill Image</Label>
                    <Input type='file' name='bill_image' id='bill_image'
                      onChange={this.handleImageChange} />
                  </FormGroup>

                  <Button color='primary' onClick={this.addexpense}>Add New Expenses</Button>
                </Form>



              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <div class="preview-images"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}