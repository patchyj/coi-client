import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileAction";
// Auth
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Bootstrap and jQuery
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Private Route
import PrivateRoute from "./components/common/PrivateRoute";

// ------- Layout -------
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
// ------- Auth -------
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword.js";
import PasswordReset from "./components/auth/PasswordReset.js";
// ------- users -------
import User from "./components/users/User.js";
// ------- Profiles -------
import Profiles from "./components/profiles/Profiles";
// ------- Profile -------
import Profile from "./components/profile/Profile";
// ------- Dashboard -------
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
// ------- Experience -------
import AddExperience from "./components/add-credentials/AddExperience";
// Education
import AddEducation from "./components/add-credentials/AddEducation";
// ------- posts -------
import Post from "./components/posts/Post.js";
import Posts from "./components/posts/Posts.js";
import NewPost from "./components/posts/NewPost.js";
import EditPost from "./components/posts/EditPost.js";
// ------- chapters -------
import Chapter from "./components/chapters/Chapter.js";
import Chapters from "./components/chapters/Chapters.js";
// ------- resources -------
import Resources from "./components/resources/Resources.js";
// ------- projects -------
import Projects from "./components/projects/Projects.js";
import ProjectProposal from "./components/projects/ProjectProposal.js";
import Project from "./components/projects/Project.js";
// ------- profile -------
// import Profile from "./components/profile/Profile.js";
// ------- admin -------
import AdminIndex from "./components/auth/admin/AdminIndex.js";
// ------- lead -------
import LeadIndex from "./components/auth/lead/LeadIndex.js";

// Not Found
import NotFound from "./components/not-found/NotFound";

import "./css/App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set Auth token header off
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

setInterval(() => {
  fetch("https://coi-node-api.herokuapp.com/api/projects/test")
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
}, 300000);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/password_reset" component={PasswordReset} />
            <Route exact path="/forgot_password" component={ForgotPassword} />

            <Route exact path="/chapters" component={Chapters} />
            <Route exact path="/chapters/:id" component={Chapter} />
            {/* POSTS */}
            <Switch>
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/new" component={NewPost} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
              <PrivateRoute exact path="/posts/:id/edit" component={EditPost} />
            </Switch>
            {/* PRIVATE USERS */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* ADMIN */}
              <PrivateRoute exact path="/admin" component={AdminIndex} />
              {/* LEAD */}
              <PrivateRoute exact path="/lead" component={LeadIndex} />
              {/* REGULAR */}
              <PrivateRoute exact path="/users/:id" component={User} />
            </Switch>
            {/* PROFILES */}
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            {/* PRIVATE PROFILES */}
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/resources" component={Resources} />
            </Switch>
            <Switch>
              {/* PROJECTS */}
              <Route exact path="/projects" component={Projects} />
              <PrivateRoute
                exact
                path="/projects/new"
                component={ProjectProposal}
              />
              <Route exact path="/projects/:id" component={Project} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
