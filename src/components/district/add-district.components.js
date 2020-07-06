import React, { Component } from "react";
import DistrictDataService from "../../services/district.service";
import UserService from "../../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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

export default class AddDistrict extends Component {
  constructor(props) {
    super(props);
    this.onChangeDistrictname = this.onChangeDistrictname.bind(this);
    this.onChangeTotalCases = this.onChangeTotalCases.bind(this);
    this.onChangeTotalActive = this.onChangeTotalActive.bind(this);
    this.onChangeRecover = this.onChangeRecover.bind(this);
    this.onChangeDeath = this.onChangeDeath.bind(this);
    this.handleDistrict = this.handleDistrict.bind(this);

    // this.saveDistrict = this.saveDistrict.bind(this);
    // this.newDistrict = this.newDistrict.bind(this);

    this.state = {
        districtname: "",
        totalcases: "",
        active: "",
        recovered: "",
        death: "",
        errormessage:"",
        rightcontent:"",
        wrongcontent:"",
        successful: false,
        message: "",
      submitted: false

    };
  }

  onChangeDistrictname(e) {
    this.setState({
        districtname: e.target.value
    });
  }

  onChangeTotalCases(e) {
    this.setState({
        totalcases: e.target.value
    });
  } 
  onChangeTotalActive(e) {
    this.setState({
        active: e.target.value
    });
  }

  onChangeRecover(e) {
    this.setState({
      recovered: e.target.value
    });
  }

  onChangeDeath(e) {
    this.setState({
      death: e.target.value
    });
  }

  handleDistrict(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

  
  

    if (this.checkBtn.context._errors.length === 0) {
        var data = {
            districtname: this.state.districtname,
            totalcases: this.state.totalcases,
            active: this.state.active,
             recovered: this.state.recovered,
            death: this.state.death,
          };
        DistrictDataService.create(data)
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

//   saveDistrict() {
//     var data = {
//       districtname: this.state.districtname,
//       totalcases: this.state.totalcases,
//       active: this.state.active,
//        recovered: this.state.recovered,
//       death: this.state.death,
//     };

//     DistrictDataService.create(data)
//       .then(response => {
//         this.setState({
//      districtname: response.data.districtname,
//       totalcases: response.data.totalcases,
//       active: response.data.active,
//        recovered: response.data.recovered,
//       death: response.data.death,
//           submitted: true
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
          
//         this.setState({
//             errormessage: e.response.data.message
//        })
//                 // console.log(e.response.data.message);
          
//       });
//   }

//   newDistrict() {
//     this.setState({
//         districtname: "",
//         totalcases: "",
//         active: "",
//         recovered: "",
//         death: "",
//       submitted: false
//     });
//   }

  componentDidMount() {
    UserService.getAdminBoard().then(
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
      return  <div><BurgerNavigation/>
      <div className="container custom-container">{this.state.wrongcontent}</div></div>
      }
      else{
    return (
      <div>
      <BurgerNavigation/>
      <div className="container custom-container">
        <div className="col-md-12">
  
                
                  
               
            <Form
            onSubmit={this.handleDistrict}
            ref={c => {
              this.form = c;
            }}
          >
               {!this.state.successful && (
       
            <div>
              <div className="form-group">
                <label htmlFor="title">District Name</label>
                <Input
                  type="text"
                  className="form-control"
                  id="districtname"
                  value={this.state.districtname}
                  onChange={this.onChangeDistrictname}
                  name="districtname"
                  validations={[required]}

                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Total Cases</label>
                <Input
                  type="number"
                  className="form-control"
                  id="totalcases"
                  required
                  value={this.state.totalcases}
                  onChange={this.onChangeTotalCases}
                  name="totalcases"
                  validations={[required]}

                />
              </div>


              <div className="form-group">
                <label htmlFor="title">Total Active</label>
                <Input
                  type="number"
                  className="form-control"
                  id="active"
                  required
                  value={this.state.active}
                  onChange={this.onChangeTotalActive}
                  name="active"
                  validations={[required]}

                />
              </div>


              <div className="form-group">
                <label htmlFor="title">Total Recovered</label>
                <Input
                  type="number"
                  className="form-control"
                  id="recovered"
                  required
                  value={this.state.recovered}
                  onChange={this.onChangeRecover}
                  name="recovered"
                  validations={[required]}

                />
              </div>



              <div className="form-group">
                <label htmlFor="title">Total Death</label>
                <Input
                  type="number"
                  className="form-control"
                  id="death"
                  required
                  value={this.state.death}
                  onChange={this.onChangeDeath}
                  name="death"
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