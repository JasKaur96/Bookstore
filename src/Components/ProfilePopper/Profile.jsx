import React from 'react';
import Popper from '@material-ui/core/Popper';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { makeStyles } from '@material-ui/core/styles';
import MarkunreadMailboxOutlinedIcon from '@material-ui/icons/MarkunreadMailboxOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import './Profile.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop:"8%",
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const logout = () => {
  localStorage.removeItem('Token');
  window.location.reload()
}

export default function Profile() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <PermIdentityIcon className="proicon" aria-describedby={id} type="button" onClick={handleClick} />
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.paper}>
          <div className="profile_main">
            Welcome
            <p>To access account and manage orders</p>
            <button className="profile_btn" onClick={logout}>LOGOUT</button>
          </div>
        </div>
      </Popper>
    </>
  );
}