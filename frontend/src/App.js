import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import setAuthToken from "./utils/setAuthToken";
// import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
// import config from './config';
import Login from "./components/Auth/Login";

// // Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());
//     // Redirect to login
//     window.location.href = "./login";
//   }
// }
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} /> */}
            {/* <Switch>
                <PrivateRoute className="dashboard" exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/article/add" component={AddArticle}/>
                <PrivateRoute exact path="/orders" component={Orders}/>
                <PrivateRoute exact path="/articles" component={Articles}/>
              </Switch> */}
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;