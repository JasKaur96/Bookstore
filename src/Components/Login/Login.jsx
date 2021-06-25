import React from 'react'; 
import '../../CSS/Login.css';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
// import clsx from 'clsx';
import UserService from '../../Services/UserService';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from '../Loader';
import { withRouter } from 'react-router';

const service = new UserService();
const userNameRef = React.createRef();
const passwordRef = React.createRef();
const saveRef = React.createRef();


function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }  

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            login: true,
            email: "",
            password: "",
            emailError: false,
            passwordError: false,
            emailErrormsg: "",
            passwordErrmsg: "",
            visibility: false,
            key: "user",
            open: false,
            snackMessage: "",
            snackType: "",
            toggle:false,
            show:true
        })
    }

    changeVisibility = () => {
        this.setState({ visibility: !this.state.visibility });
    }

    componentDidMount(){
        userNameRef.current.focus();
        // passwordRef.current.focus();
    }

    nameKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
          event.preventDefault();
          passwordRef.current.focus();
        } 
    }

    pswdKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
          event.preventDefault();
          saveRef.current.focus();
        } 
    }

    saveKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
          event.preventDefault();
          console.log("Save key Press")
          this.login();
        } 
    }

    validationCheck = () => {
        this.setState({
            emailError: false,
            emailErrormsg: '',
            passwordError: false,
            passwordErrormsg: '',
        })
        var valid = true;

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


        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "Enter a password" })
            valid = false;
        }
        return valid;
    }

    changeState = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    changeLogin = () => {
        console.log("im working");
        this.setState({ login: !this.state.login })
    }

    handleToggle = () => {
        this.setState({toggle:!this.state.toggle});
    };
  
    login = () => {
        if (this.validationCheck()) {
            let data = {
                "email": this.state.email,
                "password": this.state.password,
            }
            console.log(data);
            service.userlogin(data).then((res) => {
                console.log(res.data.result);
                localStorage.setItem('Token', res.data.result.accessToken);

                this.setState({ snackType: "success", snackMessage: "Login successful", open: true, setOpen: true });
               
                // <Loader handleToggle={this.handleToggle} toggle={this.state.toggle}/>

                // this.props.history.push('/home');

            }).catch((error) => {
                console.log(error);
                
                this.setState({ snackType: "error", snackMessage: "Login Failed", open: true, setOpen: true })
            })
        }
    }
    handleSnackClose = () => {
        this.setState({
            open: false,
            setOpen: false
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ show: false })
    }
    render() {
        return (
            <>
                <TextField inputRef={userNameRef} onKeyPress={this.nameKeyPress} id="outlined-basic" label="Email Id" variant="outlined"
                    onChange={this.changeState} name="email"
                    margin='dense' helperText={this.state.emailErrormsg} error={this.state.emailError}
                />
                <div>
                    <TextField  inputRef={passwordRef} onKeyPress={this.pswdKeyPress} id="outlined-basic" label="Password" variant="outlined" name="password"
                        margin='dense' helperText={this.state.passwordErrormsg} fullWidth error={this.state.passwordError}
                        type={this.state.visibility ? 'text' : 'password'}
                        onChange={this.changeState}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {this.state.visibility ? <Visibility className="end" onClick={this.changeVisibility} />:<VisibilityOff className="end" onClick={this.changeVisibility} />}
                            </InputAdornment>,
                        }}

                    />
                </div>
                <Button ref={saveRef} onKeyDown={this.saveKeyPress}variant="contained" color="secondary" onClick={this.login} >Login</Button>
              
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <div className="line"></div>OR<div className="line"></div></div>
                <div className="inlineButtons1">
                    <Button variant="contained" className='button1' color="primary">Facebook</Button>
                    <Button variant="contained" className='button2' color="default"> Google</Button>
                </div>
                {/* <Loader handleToggle={this.handleToggle} toggle={this.state.toggle}/> */}

                <div >
                    <Snackbar style={{width:"250px"}} open={this.state.open} autoHideDuration={3000}  onClose={this.handleSnackClose}>
                        <Alert severity={this.state.snackType}>
                            {this.state.snackMessage}
                        </Alert>
                    </Snackbar>
                </div>

            </>

        )
    }
}

export default withRouter(Login);







