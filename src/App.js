import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter,Redirect } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './Routes/Protectedroutes';
import AuthRoute from './Routes/AuthRoute';
 
export default function App() {
  const Routing =()=>{
    return(
    <Router>
      <div>
        <Switch>
          <AuthRoute exact path="/" component={Signup} ></AuthRoute>    
          <ProtectedRoute exact path="/home" component={Dashboard} ></ProtectedRoute>         
        </Switch>
      </div>
    </Router>)
  }
  return (
    <>
     <Routing />
    </>
  );
}

 
