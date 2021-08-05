import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter,Redirect } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './Routes/Protectedroutes';
import AuthRoute from './Routes/AuthRoute';
import CartBag from './Components/Cart/CartBag';
import OrderSucess from './Components/Order/Order';
import BookDetails from './Components/BookDetails/BookDetails';
import { Provider } from 'react-redux';
import store from '../src/Redux/Store/Store'

function App() {
  return (
    <>
    <Provider store={store}>
    <Router>
          <div>
            <Switch>
              <AuthRoute exact path="/" component={Signup} ></AuthRoute>    
              <ProtectedRoute exact path="/home" component={Dashboard} ></ProtectedRoute>         
              <Route path="/bookdetails" component={BookDetails}></Route> 
              <Route path="/cart" component={CartBag}></Route> 
              <Route path="/ordersuccess" component={OrderSucess}></Route> 
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
 
