import React,{Component} from 'react';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter } from 'react-router-dom';
import '../../CSS/LoginComp.css';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import UserService from '../../Services/UserService';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert"; 
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from 'react-router';
import { withStyles } from "@material-ui/core/styles";

const service = new UserService();
const nameRef = React.createRef();
const emailRef = React.createRef();
const passwordRef = React.createRef();
const mobileRef = React.createRef();          
const saveRef= React.createRef();
 
const styles = theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  });

function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }

class Sign extends Component {
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
            snackType: "",
            loader:false,
            show:true
        })
    }
    componentDidMount(){
        nameRef.current.focus();
    } 

    nameKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
          event.preventDefault();
          emailRef.current.focus();
        } 
    }
  
    emailKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
          event.preventDefault();
          passwordRef.current.focus();
        } 
    }

    pswdKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
          event.preventDefault();
          mobileRef.current.focus();
        } 
    }

    mobileKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
          event.preventDefault();
          saveRef.current.focus();
        } 
    }

    saveKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
          event.preventDefault();
          this.signUp();
        } 
    }

    validationCheck = () => {
        this.setState({
            fullNameError: false,
            fullNameErrormsg: '',
            emailError: false,
            emailErrormsg: '',
            passwordError: false,
            passwordErrormsg: '',
            mobileError: false,
            mobileErrormsg: ""
        })
        var valid = true;
        if (this.state.fullName.length == 0) {
            this.setState({ fullNameError: true })
            this.setState({ fullNameErrormsg: "Enter full name " })
            valid = false;
        }


        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.email)) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Invalid Email address" })
            valid = false;
        }
        if (this.state.email.length == 0) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Choose Email address" })
            valid = false;
        }

        if (this.state.password.length < 8) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "password should be atleast 8 characters" })
            valid = false;
        }

        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "Enter a password" })
            valid = false;
        }

        if (this.state.mobile.length == 0) {
            this.setState({ mobileError: true })
            this.setState({ mobileErrormsg: "Enter a mobile" })
            valid = false;
        }
        return valid;
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
    handleToggle = () => {
        this.setState({loader:!this.state.loader});
    };
  
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({loader:false});
    };
   
    signUp = (e) => {
        e.preventDefault();
        if (this.validationCheck()) {
            let data = {
                "fullName": this.state.fullName,
                "email": this.state.email,
                "password": this.state.password,
                "phone": this.state.mobile
            }
            this.handleToggle();
            service.userRegistration(data).then((result) => {
                console.log(result);
                this.setState({ snackType: "success", snackMessage: "Registered successful", open: true, setOpen: true })
                this.handleClose();
            }).catch((error) => {
                console.log(error);
                this.handleClose();
                this.setState({ snackType: "error", snackMessage: "Registeration Failed", open: true, setOpen: true })
            })
        }
    }
    handleSnackClose = () => {
        this.setState({
            open: false,
            setOpen: false
        })
    }

    Login = () => {
        let data = {
            "email": "",
            "password": ""
        }
        service.userlogin(data).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    }

    changeVisibility = () => { 
        this.setState({ visibility: !this.state.visibility });
    }

    render() {
        const {classes} = this.props;
        return (
            <><TextField id="outlined-basic" inputRef={nameRef} onKeyPress={this.nameKeyPress}
                    label="Fullname" className="textField"  variant="outlined" margin='dense'
                    name="fullName" error={this.state.fullNameError} helperText={this.state.fullNameErrormsg}
                    onChange={(e) => this.changeState(e)}  /> 
                    <TextField id="outlined-basic" label="Email "
                        className="textField" inputRef={emailRef} onKeyPress={this.emailKeyPress}
                        variant="outlined" margin='dense' name="email" 
                        onChange={(e) => this.changeState(e)}
                        error={this.state.emailError}
                        helperText={this.state.emailErrormsg}
                    /> 
                    
                    <TextField inputRef={passwordRef} onKeyPress={this.pswdKeyPress} id="outlined-basic" label="Password"
                        className="textField" variant="outlined"
                        margin='dense' name="password"
                        type={this.state.visibility ? 'text' : 'password'}
                        onChange={(e) => this.changeState(e)}
                        error={this.state.passwordError}
                        helperText={this.state.passwordErrormsg}
                        InputProps={{ endAdornment: <InputAdornment position="end">
                                {this.state.visibility ? <Visibility className="end" onClick={this.changeVisibility} />:<VisibilityOff className="end" onClick={this.changeVisibility} />}
                            </InputAdornment>,
                        }}
                    /> <TextField inputRef={mobileRef} onKeyPress={this.mobileKeyPress} id="outlined-basic" label="mobile"  variant="outlined"
                        margin='dense'   className="textField" name="mobile"
                        onChange={(e) => this.changeState(e)} error={this.state.mobileError}
                        helperText={this.state.mobileErrormsg} />
                    <Button ref={saveRef} onKeyDown={this.saveKeyPress} variant="contained" 
                        onClick={(e) => this.signUp(e)} >
                        Signup
                    </Button>           
                    {this.state.loader ?
                    <Backdrop
                        className={classes.backdrop}
                        open={this.state.loader}
                        onClick={this.handleClose}>
                        <CircularProgress color="inherit" />
                    </Backdrop>:<></>}
                      <div >
                    <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackClose}  >
                        <Alert severity={this.state.snackType}>
                            {this.state.snackMessage}
                        </Alert>
                    </Snackbar>
                </div>          
                </>
        )
    }
}



export default withRouter(withStyles(styles)(Sign));



