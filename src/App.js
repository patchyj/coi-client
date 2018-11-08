// ======= REACT =======
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux"; // A React component that provides our application with our state (store)
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import setAuthToken from "./utils/setAuthToken";
import Auth from "./validation/Auth";
import axios from "axios";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwtDecode from "jwt-decode";

// ======= CSS =======
import "./css/App.css";
// ======= .. =======

// ======= COMPONENTS =======
// Private Route
import PrivateRoute from "./components/common/PrivateRoute";
// ------- layout -------
import Navbar from "./components/layout/Navbar.js";
import Footer from "./components/layout/Footer.js";
// ------- auth -------
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import ForgotPassword from "./components/auth/ForgotPassword.js";
import PasswordReset from "./components/auth/PasswordReset.js";
// ------- users -------
import User from "./components/users/User.js";
// ------- static -------
import Landing from "./components/static/Landing.js";
import NotFound from "./components/static/NotFound.js";
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
import Profile from "./components/profile/Profile.js";
// ------- admin -------
import AdminIndex from "./components/auth/admin/AdminIndex.js";
// ------- lead -------
import LeadIndex from "./components/auth/lead/LeadIndex.js";

// Check for token
if (localStorage.token) {
  // Set Auth token header off
  setAuthToken(localStorage.token);
  const token = localStorage.token;
  // Decode the token
  const decoded = jwtDecode(token);
  // Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

setInterval(function() {
  console.log("hello");
  axios
    .get("https://coyi-api.herokuapp.com/ping")
    .then(res => console.log(res.data.message))
    .catch(err => console.log(err));
}, 3000); // every 5 minutes (300000)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Navbar />
            <Switch>
              {/* ADMIN */}
              <Route exact path="/admin" component={AdminIndex} />
              {/* LEAD */}
              <Route exact path="/lead" component={LeadIndex} />
              {/* USERS */}
              <Route exact path="/users/:id" component={User} />
              {/* AUTH */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/password_reset" component={PasswordReset} />
              <Route exact path="/forgot_password" component={ForgotPassword} />
              {/* DASHBOARD */}
              <Route exact path="/profile" component={Profile} />
              {/* POSTS */}
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/posts/new" component={NewPost} />
              <Route exact path="/posts/:id" component={Post} />
              <Route exact path="/posts/:id/edit" component={EditPost} />
              {/* CHAPTERS */}
              <Route exact path="/chapters" component={Chapters} />
              <Route exact path="/chapters/:id" component={Chapter} />
              {/* RESOURCES */}
              <Route exact path="/resources" component={Resources} />
              {/* PROJECTS */}
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/projects/new" component={ProjectProposal} />
              <Route exact path="/projects/:id" component={Project} />
              {/* STATIC */}
              <Route exact path="/" component={Landing} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
