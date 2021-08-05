import React, { Component } from 'react'
import '../../CSS/Header.css';
import Book from '../../Assets/education.svg'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter,Redirect } from 'react-router-dom';
import StyledBadge from '@material-ui/core/Badge'
import Profile from '../ProfilePopper/Profile';

// const styles = theme => ({
//   badge: {
//     // : theme.zIndex.drawer + 1,
//     color: 'white',
//   },
// });

export default class Header extends Component {
  constructor(props){
    super(props)
    this.state={ 
      searchTerm:"",
      profileOpen: false
      // searchBook : true
    }
}

  onClickOpen = () =>{ 
    this.props.openCart();
  }
  
  searchBook =(e)=>{
    // console.log("Headder search", e.target.value)
    this.props.searchDataBook(e.target.value);
  }

  handleChange = (e,value) => {        
    console.log("Search method",value)        
    this.setState({searchTerm: value})
    // this.setState({searchBook: false});
    console.log("header value",this.props.searchBook)   
    this.props.handleSearchBook(value,true)      
    console.log("Search term in search method",this.state.searchTerm)
}

profile = () => { 
  this.setState({profileOpen: true});
  console.log("SignOut",this.state.profileOpen)
}
    render() {
        return (
            <> 
            <div className="appbar">  
              <div>
              <Link to="/home"><img src={Book}  alt=""/></Link>
              {!this.props.header && <>
                <p className="book"><Link to="/home" style={{ listStyleType: "none", color: 'white', textDecoration: 'none' }}>Bookstore</Link></p>
                <div className="barSpace">              
                    {/* <SearchOutlinedIcon className="searchicon"/>    */}
                  {/* <input type="text" placeholder="Search"  onChange={(e)=>this.handleChange(e,e.target.value)}/> */}
                  </div></>
              }

              {this.props.value && <><p className="book"><Link to="/home" style={{ listStyleType: "none", color: 'white', textDecoration: 'none' }}>Bookstore</Link></p>
                <div className="input">              
                  <SearchOutlinedIcon className="searchicon"/>   
                  <input type="text" placeholder="Search"  onChange={(e)=>this.handleChange(e,e.target.value)}/>
                </div></>}
              </div> 
              <div> 
                <div className="pro">
                 <Profile/>
                  Profile
                </div>              
              <div className="cart">  
                   {/* <IconButton aria-label="cart"> */}
                <StyledBadge badgeContent={this.props.cartbooks} color="white" >
                  <Link to="/cart">
                    <ShoppingCartOutlinedIcon className="carticon"  />
                  </Link>
                </StyledBadge>Cart
                </div>             
              </div>
            </div>
            </>
        )
    } 
}
