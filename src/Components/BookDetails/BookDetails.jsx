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
import CustomerFeedback from "../FeedBack/FeedBack";
import { withRouter } from 'react-router';
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const service = new UserService();
const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputQuantity: true,
        getCart: [],
        cartId:"",
        loader: false
    }
}

  componentDidMount() {
    this.getCart();
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

  addedtoCart = (value) => {
    this.setState({ inputQuantity: !this.state.inputQuantity })
    let data = { 
      isCart: true
    }

    this.handleToggle();
    let token = localStorage.getItem('Token')
    console.log(value);
    service.addToCartBook(data, value._id, token).then((res) => {
      console.log(value);
      console.log(res);
      // this.getCart();
      this.setState({ cartId: value._id })
      console.log("cartId", this.state.cartId);
      this.handleClose();
    })
      .catch((err) => {
        console.log(err);
        this.handleClose();
    })
  }

getCart=()=>{
  service.getCartItems().then((res) => {
    console.log("getCart", res);
    // if(this.state.cartId === res.data.result.product_id._id){
    this.setState({ getCart: res.data.result });
    // }
    console.log("getCartdata", this.state.getCart);
  })
}

  increaseBook = (quantity, productid) => {
    console.log("quantity", quantity);
    let data = {
      "quantityToBuy": quantity + 1
    }
    console.log(data, productid);
    service.cartQuantity(data, productid).then((res) => {
      console.log(res);
      this.getCart();
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    const {classes} = this.props;
    console.log(this.props.displayDetail, "display details");
    return (
      <>
      {this.state.loader ?
            <Backdrop
              className={classes.backdrop}
              open={this.state.loader}
              onClick={this.handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>:<>

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
              {this.state.inputQuantity ? <button
                className="addtobag" onClick={() => this.addedtoCart(this.props.displayDetail)}
              >
                Add To Bag
              </button> : <><div className="addOrRemove">
               <button className="addbtn" >+</button>
                <button className="addbtn">-</button>
              </div></>
              }
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
                    <div className="number">4.5 &#9733;</div>
                    <div className="rating-star">
                      <i class="zmdi zmdi-star"></i>
                    </div>
                  </div>

                  <span style={{ color: "grey", marginLeft: "8px" }}>(20)</span>
                </div>
                <div className="card-price">
                  <span className="discount-price">
                    Rs.1500
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
              <CustomerFeedback />
            </div>
            <div className="reviews">

            </div>
          </div>
        </div>
        </>}
      </>
    );
  }
}

export default withRouter(BookDetail)