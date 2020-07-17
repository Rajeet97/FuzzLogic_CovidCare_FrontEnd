import React, { Component } from 'react';
import SafetyService from "../../services/safety.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import faq from "../images/FAQ.gif";
import ReactPlayer from "react-player";

class SafeyAccordion extends Component {
  // const DatatablePage = () => {
  constructor(props) {
    super(props);

    this.state = {
      safety: [],
      isLoaded: false,
    }

  }


  componentDidMount() {

    SafetyService.getAll().then((response) => {

      this.setState({
        safety: response.data
      })
      // console.log(response.data)
    });

  }


  render() {
    const alldata = this.state.safety.map((hlists, index) => {
      return (
        <div className="user_card sized card text-black bg-light mb-3" key={hlists._id}>

          <div id={'heading' + index} className="text-center">
            <h4 className="mb-0 font-weight-bold">
              <span className="btn-link faq-question" data-toggle="collapse" data-target={"#collapse" + index} aria-expanded="true" aria-controls="collapseOne">
                {hlists.question}
              </span>
            </h4>
          </div>
          <div id={"collapse" + index} className={index === 0 ? "collapse show" : "collapse"} aria-labelledby={'heading' + index} data-parent="#accordionExample">
            <div className="d-flex align-content-center flex-wrap">
              <ReactPlayer
                url={hlists.url}
              />


            </div>
          </div>
        </div>)



    })
    return (
      <div className="container custom-container">
        <img src={faq} alt="FAQ-one" className="rounded mx-auto d-block sizing" style={{ height: "200px", width: "auto" }} />
        <div><BurgerNavigation />
          <div className="container custom-container">
            <div className="accordion" id="accordionExample">
              {alldata}

            </div>

          </div>
        </div>
      </div>

    );

  }
}

export default SafeyAccordion;


