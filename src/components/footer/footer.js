import React, { Component } from "react";
import { NavLink ,withRouter} from "react-router-dom";
import github from "../images/git.png"
import "./footer.css";


class Footer extends Component {
  render() {
    return(  
 

      <footer id="footer" className="footer-1">
            <div className="main-footer widgets-dark typo-light">
          <div className="container">
          <div className="row">
            
          <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="widget subscribe no-box">
          <h5 className="widget-title">FUZZ LOGIC<span></span></h5>
          <p>React based project for the Agile module. </p>
          </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="widget no-box">
          <h5 className="widget-title">Quick Links<span></span></h5>
          <ul className="thumbnail-widget">
          <li>
          <div className="thumb-content">
          <NavLink to={"/charts"} >
                                    Charts
           </NavLink>
           </div>	
          </li>

          <li>
          <div className="thumb-content">
          <NavLink to={"/list-of-hospitals"} >
          View Hospitals
           </NavLink>
           </div>	
          </li>


          <li>
          <div className="thumb-content">
          <NavLink to={"/"} >
          Live Update
           </NavLink>
           </div>	
          </li>


 
          </ul>
          </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="widget no-box">
          <h5 className="widget-title">Get Started<span></span></h5>
          <NavLink to={"/register"} className="btn btn-warning">Register Now </NavLink>

          </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3">

          <div className="widget no-box">
          <h5 className="widget-title">Contact Us<span></span></h5>

          <ul className="social-footer2">
          <a title="GitHub" target="_blank" rel="noopener noreferrer" href="https://www.github.com/"><img alt="Github" width="30" height="30" src={github}/></a>
          </ul>
          </div>
          </div>

          </div>
          </div>
          </div>
  

          <div className="footer-copyright">
            <div className="container">
            <div className="row">
            <div className="col-md-12 text-center">
            <p>Copyright Covid Care© 2020. All rights reserved.</p>
            </div>
            </div>
            </div>
            </div>
     
      </footer>
    
  
    );
  }
}

export default withRouter(Footer)

