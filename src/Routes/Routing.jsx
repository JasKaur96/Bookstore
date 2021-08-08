import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import BookDetails from '../Components/BookDetails/BookDetails';
import CartBag from '../Components/Cart/CartBag';
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
            <ProtectedRoute exact path = "/dashboard" component={Dashboard}></ProtectedRoute>         
            <Route path="/bookdetails/:id" component={BookDetails}></Route> 
            <Route path="/cart" component={CartBag}></Route> 
          </Switch>
        </div>
      </Router>
    );
  }

  export default Routing;