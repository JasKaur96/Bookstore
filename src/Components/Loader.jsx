import React from 'react';
import '../../src/CSS/Signup.css';
// import LoginComp from '../../Pages/Login/LoginComp'
 
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  
export default function Loader(props) {
    
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
   
        return(
        <>
        <div className="body">
            {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
                Show backdrop
                </Button> */}
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
        </>)
    
} 