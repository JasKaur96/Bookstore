import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Login from '../Pages/Login/Login';
import Registration from '../Pages/Registeration/Registration';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './Protectedroutes';
const Routing = () => {
    return (
      <Router>
        <div>
          <Switch>
            <AuthRoute exact path="/" component={Registration}></AuthRoute>
            <AuthRoute path = "/login" component={Login}></AuthRoute> 
            <ProtectedRoute path = "/dashboard" component={Dashboard}></ProtectedRoute> 
       
          </Switch>
        </div>
      </Router>
    );
  }

  export default Routing;