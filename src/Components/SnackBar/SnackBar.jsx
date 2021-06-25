import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '10px',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function SnackBar(props) {
    const classes = useStyles();
  const [open, setOpen] = React.useState(false); 

   resType = (type) => {
    return type;
  };
    

   Message = (message) => {
     setOpen(true);
    return message;
  };

  return (
    <div >
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={3000} >
          <Alert severity={resType}>
            <Message />
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}