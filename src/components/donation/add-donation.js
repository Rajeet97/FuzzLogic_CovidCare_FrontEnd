import React, { Component } from "react";
import DonationDataService from "../../services/donation.service";
import UserService from "../../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import $ from 'jquery'
import donate from "../images/Donation2.gif";



const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default class AddDonation extends Component {
  constructor(props) {
    super(props);
    this.onChangeProfession = this.onChangeProfession.bind(this);
    this.onChangeDonationAmount= this.onChangeDonationAmount.bind(this);
    this.onChangeCommentBox= this.onChangeCommentBox.bind(this);

    this.handleDonation = this.handleDonation.bind(this);



    this.state = {
        profession: "",
        donationamount: "",
        commentbox: "",
        errormessage:"",
        rightcontent:"",
        wrongcontent:"",
        successful: false,
        message: "",
        totalamount:0,
      submitted: false,
      totalpersons:"",
      donations:[],
      currentUser: AuthService.getCurrentUser(),
      owndonations:[],

    };
  }

  onChangeProfession(e) {
    this.setState({
        profession: e.target.value
    });
  }

  onChangeDonationAmount(e) {
    this.setState({
        donationamount: e.target.value
    });
  } 
  onChangeCommentBox(e) {
    this.setState({
        commentbox: e.target.value
    });
  }


  

  handleDonation(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

  
  

    if (this.checkBtn.context._errors.length === 0) {
        var data = {
            profession: this.state.profession,
            commentbox: this.state.commentbox,
            donationamount: this.state.donationamount,
             currentusername: this.state.currentUser.username,
             currentfullname: this.state.currentUser.fullname,
          };
          DonationDataService.create(data)
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



    DonationDataService.getAll().then((response) => {
        this.setState({
          donations: response.data,
        })

    });


    DonationDataService.getAllByUser(this.state.currentUser.username).then((response) => {
        this.setState({
          owndonations: response.data,
        })

    });

    DonationDataService.getAllByUniqueValue().then((response) => {
        this.setState({
          totalpersons: response.data.length,
        })

    });

    
  }

  componentWillMount(){
    $(document).ready(function() {

        $('.counter').each(function () {
        $(this).prop('Counter',0).animate({
        Counter: $(this).text()
        }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
        $(this).text(Math.ceil(now));
        }
        });
        });

        });
  }




  render() {
        let  amount = 0;      
        this.state.donations.map((hlists,index)=>{
                return (amount = amount + hlists.donationamount);
        })

        let  ownamount = 0;      
        this.state.owndonations.map((hlists,index)=>{
            return (ownamount = ownamount + hlists.donationamount);
         })




      if(this.state.wrongcontent){
      return  <div><BurgerNavigation/> <div className="container custom-container">{this.state.wrongcontent}</div></div>
      }
      else{
    return (
    <div><BurgerNavigation/>


    <div className="container custom-container">
    <img src={donate} alt="donation-one" className="rounded mx-auto d-block sizing"/>

    <div className="row">
            
        <div className="col">
            <div className="counter-box"> <i className="fa fa-heart"></i> <span className="counter">    
           
          {amount}
            </span>
                <p>Total Donation Amount</p>
            </div>
        </div>

        <div className="col">
    <div className="counter-box"> <i className="fa fa-group"></i> <span className="counter">{this.state.totalpersons}</span>
                <p>Total Donors</p>
            </div>
        </div>

        <div className="col">
    <div className="counter-box"> <i className="fa fa-user"></i> <span className="counter">{ownamount}</span>
                <p>Your Contribution</p>
            </div>
        </div>
    </div>
    </div>


      <div className="container user_card">
   

        <div className="col-md-12">
  
                                
               
            <Form
            onSubmit={this.handleDonation}
            ref={c => {
              this.form = c;
            }}
          >
               {!this.state.successful && (
       
            <div>
                <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <Input
                  type="text"
                  className="form-control"
                  value={this.state.currentUser.fullname}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="profession">Profession</label>
                <Input
                  type="text"
                  className="form-control"
                  id="profession"
                  value={this.state.profession}
                  onChange={this.onChangeProfession}
                  name="profession"
                  validations={[required]}

                />
              </div>

              <div className="form-group">
                <label htmlFor="donationamount">Amount</label>
                <Input
                  type="number"
                  className="form-control"
                  id="donationamount"
                  required
                  value={this.state.donationamount}
                  onChange={this.onChangeDonationAmount}
                  name="donationamount"
                  validations={[required]}

                />
              </div>


          


              <div className="form-group">
                <label htmlFor="commentbox">Where would you like the amount to be used?</label>
                <TextArea
                  type="text"
                  className="form-control"
                  id="commentbox"
                  required
                  value={this.state.commentbox}
                  onChange={this.onChangeCommentBox}
                  name="commentbox"
                  validations={[required]}

                />
              </div>



            
              <div className="form-group">
                  <button className="btn btn-success btn-block">Add Donation</button>
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