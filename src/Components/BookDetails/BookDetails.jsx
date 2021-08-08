import React, { Component } from 'react';
import '../DisplayBook/DispalyBook.css';
import UserService from '../../Services/BookService';
import Book from "../../Assets/book.png";
import { Button, Snackbar } from '@material-ui/core';
import "../../CSS/BookDetail.css"
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Alert } from '@material-ui/lab';

const mapStateToProps = (state) => {
  return {
      selectedBook:state.bookDetails,
      cart_count:state.cart_count,
      open: state.open,      
  }
} 

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
        loader: false,
        bookBagged: false,
        count:this.props.cart_count,
        snackMessage: "",
        snackType: "",
        _books: ""
    } 
    this.getBookByRoute();
  }

  componentDidMount() {
      this.getCart();
      this.getBookByRoute(); 
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
    let token = localStorage.getItem('Token')
    service.addToCartBook(data, value._id, token).then((res) => {
      this.getCart();
      this.setState({ cartId: value._id })
      let cart_Num = this.state.count + 1;
      this.setState({count : cart_Num});   
      this.setState({ snackType: "success", snackMessage: "Added book to cart!", open: true, setOpen: true });
      this.handleClose();
    
      // const URL = `/bookdetails/${value._id}`;
      // this.props.history.push({pathname: URL, id: value._id });
      // this.props.history.push
    })
      .catch((err) => {
        console.log(err);
    })
  }

  getCart=()=>{
    this.handleToggle();
    service.getCartItems().then((res) => {
      this.setState({ getCart: res.data.result });
      this.state.getCart.map((value) => {
        if((this.props.selectedBook?.bookName || this.state._books.bookName)== value.product_id.bookName){
          this.setState({bookBagged : true})
        }
        this.handleClose();          
      }) 
    })
  }
 
  increaseBook = (quantity, productid) => {
    let data = {
      "quantityToBuy": quantity + 1
    }
    service.cartQuantity(data, productid).then((res) => {
      this.getCart();
    }).catch((err) => {
      console.log(err);
    })
  }
 
  bookInBag = (id) =>{
      let result = this.state.getCart.find(function(value) {
        if(value.product_id._id === id){
          console.log("true")
          return true;
        }else{
          console.log("false")
          return false;
        }
      })
      return result;   
  }

  handleSnackClose = () => {
    this.setState({
        open: false,
        setOpen: false
    })
} 


getBookByRoute=()=>{
  const queryParams = new URLSearchParams(window.location.search);
  const book_details = (this.props.selectedBook?._id || queryParams.get('id'))
  let book = "";

  service.getAllBooks().then((res) => {
    let books = res.data.result;    
    books.filter(data => data._id === book_details).map((val) =>{
      book = val;
    }) 
    this.setState({ _books: book }); 
  }).catch((err) => {
      console.log(err);
      this.handleClose();
  })
 
}

  render() {
    const {classes} = this.props;
   
    return (
      <>
      {this.state.loader ?
        <Backdrop
              className={classes.backdrop}
              open={this.state.loader}
              onClick={this.handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>:<>
        <Header cartbooks={this.state.count} openCart={this.props.open}/>
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

            {this.bookInBag(this.state._books._id) ?           
              <div className="addOrRemove">              
                  <button className="addedtobag">ADDED TO BAG</button>
              </div> 
              :
              <button className="addtobag" onClick={() => this.addedtoCart(this.state._books)}
                  >ADD TO BAG
                  </button>               
                
            }                  
            </div>
          </div>

          <div className="details"> 
            <div className="bookdetail">
              <div className="cardcontainer">
                <div className="title">
                  {this.state._books.bookName}
                </div>
                <div className="author">
                  <span className="byauthor">by</span>
                  <span className="authorname">
                    {this.state._books.author}
                  </span>
                </div>
                <div className="card-rating">
                  <div className="star">
                    <div className="number"> 4.5 &#9733;</div>
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
                      {this.state._books.price}
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
          </div>
        </div>
        <div>
          <Snackbar style={{width:"250px"}} open={this.state.open} autoHideDuration={3000}  onClose={this.handleSnackClose}>
            <Alert severity={this.state.snackType}>
              {this.state.snackMessage}
            </Alert>
          </Snackbar>
        </div>

        <Footer/>
        </>}
      
      </>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(BookDetail))