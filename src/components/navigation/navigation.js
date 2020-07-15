import React, { Component } from "react";
import { NavLink, withRouter  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../allchart.scss";



// Be sure to include styles at some point, probably during your bootstraping

import AuthService from "../../services/auth.service";


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
        <div>              
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <NavLink to={"/"} className="navbar-brand">
                          Covid Care
                        </NavLink>
                        <div className="navbar-nav mr-auto">
                            {/* <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                              Home
                            </Link>
                          </li> */}



                          {showModeratorBoard && (
                            <li className="nav-item">
                              <NavLink to={"/mod"} className="nav-link">
                                Moderator Board
                              </NavLink>
                            </li>
                          )}

                          {showAdminBoard && (
                            <li className="nav-item">
                              <NavLink to={"/admin"} className="nav-link">
                                Admin Board
                              </NavLink>
                            </li>
                          )}


                        {/* {showAdminBoard && (
                            <li className="nav-item">
                              <Link to={"/test-add-district"} className="nav-link">
                                Test Add District
                              </Link>
                            </li>
                          )} */}

                          {showAdminBoard && (
                            <li className="nav-item">
                            <NavLink to={"/districts"} className="nav-link">
                            Districts 
                            </NavLink>
                            </li>
                        )} 


                        {showAdminBoard && (
                            <li className="nav-item">
                            <NavLink to={"/hospitals"} className="nav-link">
                            Hospitals 
                            </NavLink>
                            </li>
                        )} 

                        {showAdminBoard && (
                            <li className="nav-item">
                            <NavLink to={"/helpline"} className="nav-link">
                                Helpline 
                            </NavLink>
                            </li>
                        )} 

                        {showAdminBoard && (
                            <li className="nav-item">
                            <NavLink to={"/faq"} className="nav-link">
                                Faq 
                            </NavLink>
                            </li>
                        )} 

                      {showAdminBoard && (
                            <li className="nav-item">
                            <NavLink to={"/suspect"} className="nav-link">
                            Suspect 
                            </NavLink>
                            </li>
                        )} 





                          {currentUser && (
                            <li className="nav-item">
                              <NavLink to={"/user"} className="nav-link">
                                User
                              </NavLink>
                            </li>
                          )}

                        {currentUser && (
                            <li className="nav-item">
                              <NavLink to={"/add-helpline"} className="nav-link">
                                Add helpline
                              </NavLink>
                            </li>
                          )}
                        

                        {currentUser && (
                            <li className="nav-item">
                              <NavLink to={"/view-helpline"} className="nav-link">
                                View helpline
                              </NavLink>
                            </li>
                          )}


                        
                        
                        
                        {currentUser && (
                            <li className="nav-item">
                              <NavLink to={"/add-suspect"} className="nav-link">
                                Add suspect
                              </NavLink>
                            </li>
                          )}

                        {currentUser && (
                            <li className="nav-item">
                              <NavLink to={"/view-suspect"} className="nav-link">
                                View suspect
                              </NavLink>
                            </li>
                          )}


                        
                          <li className="nav-item">
                                  <NavLink to={"/newsfeed"} className="nav-link">
                                    News Feed
                                  </NavLink>
                          </li>

                          <li className="nav-item">
                                  <NavLink to={"/charts"} className="nav-link">
                                    Charts
                                  </NavLink>
                            </li>

                            <li className="nav-item">
                                  <NavLink to={"/list-of-hospitals"} className="nav-link">
                                    View Hospitals
                                  </NavLink>
                            </li>

                            <li className="nav-item">
                                  <NavLink to={"/faqs"} className="nav-link">
                                    View FAQ
                                  </NavLink>
                            </li>
                          
                        </div>
                        {currentUser ? (
                          <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                              <NavLink to={"/profile"} className="nav-link">
                                {currentUser.username}
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <a href="/login" className="nav-link" onClick={this.logOut}>
                                LogOut
                              </a>
                            </li>
                          </div>
                        ) : (
                          <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                              <NavLink to={"/login"} className="nav-link">
                                Login
                              </NavLink>
                            </li>

                            <li className="nav-item">
                              <NavLink to={"/register"} className="nav-link">
                                Sign Up
                              </NavLink>
                            </li>
                          </div>
                        )}
                      </nav>

                  
              </div>

          
    );
  }
}

export default withRouter(Navigation);
