import React, { Component } from 'react'
import '../../CSS/Header.css';
import Book from '../../Assets/education.svg'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { BrowserRouter as Router, Route, Link, Navlink, Switch, BrowserRouter,Redirect } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <>
            <div className="appbar"> 
            <div>
            <img src={Book}  alt=""/>
              <p><Link to ="/home" style={{listStyleType:"none",color:'white',textDecoration:'none'}}>Bookstore</Link></p> 
             
              <div className="input">
               < SearchOutlinedIcon className="searchicon" />   
              <input type="text" placeholder="Search" />
              </div>
              </div> 
              <div>
              <div className="pro">
               <PermIdentityIcon className="proicon" />
               Profile
              </div>
              
              <div className="cart">
                <ShoppingCartOutlinedIcon className="carticon" />
                  Cart
              </div>
             
            </div>
            </div>
            </>
        )
    }
}
