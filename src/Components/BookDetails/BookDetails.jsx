import React, { Component } from 'react';
import '../DisplayBook/DispalyBook.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import UserService from '../../Services/BookService';
import Book from "../../Assets/book.png";
import { Button } from '@material-ui/core';
import Paginations from "@material-ui/lab/Pagination";
import PaginationBar from '../Pagination/Pagination';
import "../../CSS/BookDetail.css"

const service = new UserService();
export default class BookDetail extends Component {
    render() {
      console.log(this.props.displayDetail, "display details");
      return (
        <>
          <div className="mainContainer">
            <div className="container">
              <div className="imgs-container">
                <div className="twoimg-comtainer">
                  <div className="imgsmall1">
                    <img src={Book} className="mediumimg" alt="" />
                  </div>
                  <div className="image2">
                    <img src={Book} className="mediumimg" alt="" />
                  </div>
                </div>
                <div className="mainimg">
                  <img src={Book} className="bigimg" alt="" />
                </div>
              </div>
              <div className="wishlist">
                <button className="addtobag">
                  Add To Bag
                </button>
                {/* <div className="addOrRemove">
                  <button
                    className="addbtn"
                  >
                    +
                  </button>
                  <button
                    className="addbtn"
                  >
                    -
                  </button>
                </div> */}
                <button className="addwishlist">
                  
                  <i class="zmdi zmdi-favorite"></i> <span>WishList</span>
                </button>
              </div>
            </div>
            <div className="details">
              <div className="bookdetail">
                <div className="cardcontainer">
                  <div className="title">
                    {this.props.displayDetail.bookName}
                  </div>
                  <div className="author">
                    <span className="byauthor">by</span>
                    <span className="authorname">
                      {this.props.displayDetail.author}
                    </span>
                  </div>
                  <div className="card-rating">
                    <div className="star">
                      <div className="number">4.5</div>
                      <div className="rating-star">
                        <i class="zmdi zmdi-star"></i>
                      </div>
                    </div>
  
                    <span style={{ color: "grey", marginLeft: "8px" }}>(20)</span>
                  </div>
                  <div className="card-price">
                    <span className="discount-price">
                     Rs.1500
                      {/* {this.props.displayDetail.price} */}
                    </span>
                    <span className="price">
                      <strike>
                        {this.props.displayDetail.price}
                      </strike>
                    </span>
                  </div>
                </div>
              </div>
              <div className="horizoantalline">
                <hr></hr>
              </div>
              <div className="desc-book">
                <div className="desc-title">
                  <span className="dot"></span>
                  <span>Book Detail</span>
                </div>
                <div className="lorem">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                  assumenda minus libero minima ad, optio recusandae! Laboriosam
                  velit, labore nulla minima vel magni accusamus unde ratione
                  nostrum rerum! Voluptas asperiores ratione tempora magni atque
                  sunt doloribus velit molestias! Commodi blanditiis hic sunt illo
                  cum libero repellat voluptates quia sapiente quos.
                </div>
              </div>
  
              <div className="horizoantalline">
                {" "}
                <hr></hr>
              </div>
              <div className="customer-feedback-container-">
                <span className="feedback">Customer Feedback</span>
                
              </div>
              <div className="reviews">
                
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  