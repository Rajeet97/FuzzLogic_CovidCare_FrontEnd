import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./allchart.scss";


import AuthService from "./services/auth.service";

import Login from "./components/user/login.component";
import Register from "./components/user/register.component";
import Home from "./components/home.component";
import Footer from "./components/footer/footer";
import Profile from "./components/user/profile.component";
import BoardUser from "./components/dashboard/board-user.component";
import BoardModerator from "./components/dashboard/board-moderator.component";
import BoardAdmin from "./components/dashboard/board-admin.component";
import NewsFeed from "./containers/newsfeeds/newsfeeds";
import Charts from "./containers/charts/charts";
import ViewDistricts from "./components/district/edit-view-districts-cases-table";

// import AddDistrict from "./components/district/add-district.components";
import Hospital from "./components/hospital/add-view-edit-delete-hospital";
import ViewHospitals from "./components/hospital/view-list-of-hospitals";
import Faq from "./components/faq/add-view-edit-faqs";
import ViewFaq from "./components/faq/view-faqs";
import ViewFaqVideo from "./components/faq/view-faqs-video";
import Safety from "./components/safety/add-view-edit-safety";
import ViewSafety from "./components/safety/view-safety";
import Addhelpline from "./components/helpline/add-helpline";
import Helpline from "./components/helpline/view-edit-delete-helpline";
import ViewHelpline from "./components/helpline/view-response-status-helpline";
import PrivateRoute from "./utils/PrivateRoute";
import NoPageFound from "./components/pagenotfound/pageNotFound";
import ViewSuspect from "./components/suspect/view-edit-user-suspect";
import AddSuspect from "./components/suspect/add-suspect";
import Suspect from "./components/suspect/update-delete-response-suspect";
import AddDonation from "./components/donation/add-donation";
import ResponseDonation from "./components/donation/view-response-donation";
import AddSelfCheck from "./components/selfcheck/add-selfcheck";
import ResponseSelfCheck from "./components/selfcheck/view-response-selfcheck";
import Expense from "./components/expense/add-expenses";
import ViewExpense from "./components/expense/view-expenses";
import EditExpense from "./components/expense/edit-delete-expenses";





class App extends Component {
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

    return (
      <div>
        <Router>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <PrivateRoute exact path="/districts" component={ViewDistricts} />
            <PrivateRoute exact path="/hospitals" component={Hospital} />
            <Route exact path="/list-of-hospitals" component={ViewHospitals} />
            <PrivateRoute exact path="/faq" component={Faq} />
            <PrivateRoute exact path="/safety" component={Safety} />

            <PrivateRoute exact path="/expenses" component={Expense} />
            <PrivateRoute exact path="/view-expenses" component={ViewExpense} />
            <PrivateRoute exact path="/edit-expenses" component={EditExpense} />


            <Route exact path="/safety-measures" component={ViewSafety} />

            <Route exact path="/faqs" component={ViewFaq} />
            <Route exact path="/faq-video" component={ViewFaqVideo} />

            <PrivateRoute exact path="/add-helpline" component={Addhelpline} />
            <PrivateRoute exact path="/helpline" component={Helpline} />
            <PrivateRoute exact path="/view-helpline" component={ViewHelpline} />
            <PrivateRoute exact path="/add-suspect" component={AddSuspect} />
            <PrivateRoute exact path="/view-suspect" component={ViewSuspect} />
            <PrivateRoute exact path="/suspect" component={Suspect} />
            <PrivateRoute exact path="/add-donation" component={AddDonation} />
            <PrivateRoute exact path="/donation" component={ResponseDonation} />
            <PrivateRoute exact path="/add-selfcheck" component={AddSelfCheck} />
            <PrivateRoute exact path="/selfcheck" component={ResponseSelfCheck} />



            {/* <Route exact path="/test-add-district" component={AddDistrict} /> */}
            <Route path="/newsfeed" exact component={NewsFeed} />
            <Route path="/charts" exact component={Charts} />
            <Route>
              <NoPageFound />
            </Route>
          </Switch>
          <Footer />

        </Router>
      </div>

    );
  }
}

export default App;
