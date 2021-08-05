import React, { Component } from 'react';
import book1 from "../../Assets/book.png";
import '../DisplayBook/DispalyBook.css';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserService from '../../Services/BookService';
  
const service = new UserService();

const mapStateToProps = (state) => {
    return {
        selectedBook:state.bookDetails,
        cart_count:state.cart_count,
        open: state.open,      
    }
}

const styles = theme => ({
    root: {
        padding: 9,
        // position:"fixed",
        // width: 233,
        height: 258,
        marginTop: 17,
        // boxShadow:"5px 10px 10px #9E9E9E",
        "&:hover":{
            height: 308,            
            boxShadow:"2px 2px 15px 10px #9E9E9E",
        },      
    },
    
    media: {
      height: 140,
      width: 90,
      marginLeft: 68  
    },
    margin: {
        width: 130,
        marginLeft: theme.spacing(7.5) 
       
      },
  });

  

class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputQuantity: true,
            cartId:"",
            count:this.props.cart_count,
            getCartBook:[],
            bookBagged: false,
            reload: true,
        }
    }

    componentDidMount=()=>{
        this.getCart();
        // this.addToCart()
    }
    componentDidUpdate=()=>{
    // this.addToCart()
    }

    addToCart = (value) => {
        this.getCart();
        let data = { 
            isCart: true
        }

        if(this.state.bookBagged === true){
            console.log("if book bagged.",value._id)

            // this.removeBookFromCart(value._id)

            service.removeCartItem(value._id).then((res) => {
                console.log(res, "value id ---", value._id); 
                this.setState({bookBagged : false})
                    
            }).catch((err) => {
                console.log(err);
            })
        }else{
            this.setState({ inputQuantity: !this.state.inputQuantity })           

            let token = localStorage.getItem('Token')
            console.log("Add to cart", data)
        
            service.addToCartBook(data, value._id, token).then((res) => {
                console.log("inside aa to cart")
                // this.getCart();
                this.setState({bookBagged : true})
                let cart_Num = this.state.count + 1;
                this.setState({count : cart_Num});   
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }        

    getCart=()=>{        
        service.getCartItems().then((res) => {
          this.setState({ getCartBook: res.data.result });
          this.state.getCartBook.map((value) => {
            if(this.props.book.bookName == value.product_id.bookName){
              this.setState({bookBagged : true})
            }                   
          })       
        })
        return this.state.bookBagged;
      }
    
    removeBookFromCart = (id) => {
        service.removeCartItem(id).then((res) => {
            console.log(res);
            this.setState({ bookBagged: false })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes.root}>
             <CardActionArea onClick={(e)=>this.props.bookDetails(e,this.props.book)}>
               <CardMedia
                 className={classes.media}
                 image={book1}               
               />
              <CardContent >
                <Typography gutterBottom variant="body1" component="h2">
                    {this.props.book.bookName}
                </Typography>
                <Typography variant="body3" color="textSecondary" component="p">
                    by {this.props.book.author}<br/>4.5 &#9733;
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Rs.{this.props.book.price}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.margin}>         
            
                <Button variant="contained" size="small" color= {this.state.bookBagged ? "secondary":"primary"}
                    onClick={() => this.addToCart(this.props.book) }>{this.state.bookBagged ?<> REMOVE </>:<> ADD TO BAG</>}
                </Button>               
             
            </CardActions>
          </Card>
        
        );
    }
}

export default withStyles(styles)(BookCard);