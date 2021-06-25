import React from 'react';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter } from 'react-router-dom';
import '../../CSS/LoginComp.css';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import UserService from '../../Services/UserService';
import loginImage from '../../Assets/loginImg.png';
import Login from '../../Components/Login/Login';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Sign from '../../Components/Signup/Sign';
 
const service = new UserService();
const nameRef = React.createRef();
const emailRef = React.createRef();
const passwordRef = React.createRef();
const mobileRef = React.createRef();          
const saveRef= React.createRef();


function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }

export default class LoginComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            login: false,
            fullName: "",
            email: "",
            password: "",
            mobile: "",
            fullNameError: false,
            emailError: false,
            passwordError: false,
            mobileError: false,
            fullNameErrormsg: "",
            emailErrormsg: "",
            passwordErrmsg: "",
            mobileErrmsg: "",
            visibility:false,
            open: false,
            snackMessage: "",
            snackType: ""
        })
    }
    changeState = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }

    changetoSignup = () => {
        this.setState({ login: true })
    }
    
    changetologin = () => {
        this.setState({ login: false })
    }

    render() {
        return (<>
            <div className="imagebody" >
                <img src={loginImage} style={{ borderRadius: '50%', width: '215px', height: '215px' }} alt="" />
                <div className="online"><strong> ONLINE BOOK SHOPPING</strong></div></div>
            <div className="form">
                <div className="inlinelinks">
                    <div onClick={this.changetoSignup} className={this.state.login === false ? "links": "links2"} style={{cursor:"pointer"}}><strong>Login</strong></div>
                    <div onClick={this.changetologin} className={this.state.login === true ? "links": "links2"} style={{cursor:"pointer"}}><strong>Signup</strong></div>
                </div>
                {this.state.login ? <Login loginStatus={this.state.login} /> : <Sign loginStatus={this.state.login}/>}
                             </div>
          
        </>)
    }
}