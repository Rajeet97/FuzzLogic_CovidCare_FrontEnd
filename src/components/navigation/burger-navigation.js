import {
  Nav, Navbar, NavDropdown,
  //  DropdownButton ,Dropdown
} from "react-bootstrap";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../allchart.scss";
import logo from "../images/logo.png";


import AuthService from "../../services/auth.service";


class BurgerNavigation extends Component {
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
    const { currentUser, showAdminBoard } = this.state;

    return (
      <header> 
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img src={logo} alt="burger-one" className="d-inline-block align-top" style={{ height: "30px", width: "auto" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {showAdminBoard && (
                <Nav.Link href="/districts">Districts </Nav.Link>
              )}
              {showAdminBoard && (
                <Nav.Link href="/faq">FAQ </Nav.Link>
              )} 
              {showAdminBoard && (
                <Nav.Link href="/safety">Safety Measures </Nav.Link>
              )}
              {showAdminBoard && (
                <Nav.Link href="/suspect">Suspect </Nav.Link>
              )}
              {showAdminBoard && (
                <NavDropdown title="Services" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/hospitals">
                    Hospitals
                </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/helpline">
                    Helpline
                </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/selfcheck">
                    Selfcheck
                </NavDropdown.Item>
                </NavDropdown>
              )}
              {showAdminBoard && (
                <NavDropdown title="Expenses" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/expenses">Add Expenses</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/edit-expenses">
                    Edit Expenses
                                </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link href="/newsfeed">News Feed </Nav.Link>
              <Nav.Link href={"/charts"} >
                Charts
              </Nav.Link>
              {showAdminBoard ? "" : (
                <Nav.Link href={"/safety-measures"} >
                  Safety Measures
                </Nav.Link>
              )}
              {showAdminBoard ? "" : (
                <NavDropdown style={{ display: showAdminBoard ? "none" : "" }} title="FAQ" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/faqs">FAQ</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/faq-video">
                    Video
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {/* admin dashboard end*/}

              {currentUser && (
                <NavDropdown style={{ display: showAdminBoard ? "none" : "" }} title="Our services" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/add-selfcheck">Self Check</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/view-expenses">
                    Expenses
                      </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/add-donation">
                              Donation
                      </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/list-of-hospitals">
                    Hospitals
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {currentUser && (

                <NavDropdown style={{ display: showAdminBoard ? "none" : "" }} title={showAdminBoard ? "User Helpine" : "Helpines"} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/add-helpline">Add Helpline</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/view-helpline">
                    View Helpline
                            </NavDropdown.Item>
                </NavDropdown>
              )}


              {currentUser && (

                <NavDropdown style={{ display: showAdminBoard ? "none" : "" }} title={showAdminBoard ? "User Suspect" : "Suspect"} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/add-suspect">Add Suspect</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/view-suspect">
                    View Suspect
                                </NavDropdown.Item>
                </NavDropdown>
              )}



            </Nav>

            {currentUser ? (
              <Nav>
                <div className="btn-group dropleft">
                  <button type="button" className="dropdown-toggle  btn btn-outline-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {currentUser.username}
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/profile">Profile</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item logout" href="/login" onClick={this.logOut}>Logout</a>
                  </div>
                </div>
              </Nav>
            ) : (
                <Nav>
                  <Nav.Link href="/login"> Login</Nav.Link>
                  <Nav.Link href="/register">
                    Sign Up
                            </Nav.Link>
                </Nav>
              )}

          </Navbar.Collapse>
        </Navbar>

      </header>


    );
  }
}

export default BurgerNavigation;
