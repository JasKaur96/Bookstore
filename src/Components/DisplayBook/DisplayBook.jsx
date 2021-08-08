import React, { Component,Profiler } from 'react';
import './DispalyBook.css';
import UserService from '../../Services/BookService';
import book1 from "../../Assets/book.png";
import PaginationBar from '../Pagination/Pagination';
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Footer from '../Footer/Footer';
import BookCard from '../Card/BookCard';
import { FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select } from '@material-ui/core';

const service = new UserService();

const styles = theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    paper:{
        height: 258,
        marginTop: 37,
        marginBottom: 7,
    },
    card:{
        padding: 25,
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 200,
        minHeight: 2
      },
      selectEmpty: {
        marginTop: theme.spacing(10),
      },
 
  });
  
var  arr = [];

class DisplayBook extends Component {
   
    constructor(props) {
        super(props);
        this.state = ({ 
            sort: "",
            _books: [],
            _cartBooks: [],
            postsPerPage: "8",
            currentPage: "1",
            books: [],
            searchedBook: [],
            searchedData:[],
            loader:false,
            show:true
        })
    }

   
    componentDidMount() {
        this.getAllBooks();
    } 
 
    bookDetails = (e,value) =>{
        this.props.bookDetail(value);
    } 

    storeBooks = (books) => {
        this.books = books;       
        return this.books;
    }

    changepage = (e, newpage) => {  
        this.setState({ currentPage: newpage });
    };

    getBooks = () => {
        return this.books;
    }

    handleChange = (event) => {
        this.setState({ sort: event.target.value });
    };

    handleToggle = () => {
        this.setState({loader:!this.state.loader});
    };
  
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({loader:false});
    };

    sort = (e) =>{
        let sortData = [...this.state._books].sort(function(a,b){
            return b.price-a.price;
        })
        if(e.target.value === "dsec"){           
            this.setState({_books : sortData})            
        }
        else if(e.target.value === "asec"){
            this.setState({_books : sortData.reverse()}) 
        }else if(e.target.value === "alpha"){
            let data = [...this.state._books].sort(function(a,b){
                if(a.bookName < b.bookName){
                    return -1;
                }
                return 0;
            })
            this.setState({_books : data})
        }
    }

    search = () =>{
         if(this.props.searchedData != []){
            this.setState({ _books:this.props.searchedData});
        }    
    }
    
    getAllBooks = () => {
        var books = [];
        this.handleToggle()
        service.getAllBooks().then((res) => {
            books = res.data.result;
            var book = this.storeBooks(books);  
            this.setState({ _books: books });
            this.props.getBook(books);            
            this.handleClose();
        }).catch((err) => {
            console.log(err);
            this.handleClose();
        })
    }
  
    bookInBag = (id) =>{
        console.log("display",this.state._books);
        console.log("display iddd",);

        let result = this.state._books.find(function(value) {
          if(value._id === id){
            return true;
          }else{
            return false;
          }
        })
        return result;   
    }

    getBooks = () => {
        this.setState({
            _books: this.getBooks(),
        })
    }
    
    profiler = (id,phase,actualDuration,baseDuration,startTime,commitTime,interactions) => {
        console.log(`${id}`)
        console.log(`phase:${phase}`);
        console.log(`Actual time: ${actualDuration}`);
        console.log(`Base time: ${baseDuration}`);
        console.log(`Start time: ${startTime}`);
        console.log(`Commit time: ${commitTime}`);
        console.log(`Interactions: ${interactions}`);
    }

    render() {
        const LastBook = this.state.currentPage * this.state.postsPerPage;
        const FirstBook = LastBook - this.state.postsPerPage;   
        const currentBooks = this.props.searchBook? this.props.searchedData.slice(FirstBook, LastBook) : this.state._books.slice(FirstBook, LastBook);   
        const {classes} = this.props;
        console.log("Display data",this.props.searchedData)
        return (
            <>  {this.state.loader ?
                    <Backdrop
                        className={classes.backdrop}
                        open={this.state.loader}
                        onClick={this.handleClose}>
                        <CircularProgress color="inherit" />
                    </Backdrop>:<>
                
                <div className="usercontent">
                    <div className="inlineheader">
                        <div className="headers">
                            Books <span> ({this.props.searchBook ?<>{this.props.searchedData.length} </>:<>{this.state._books.length}</>} Items)</span>
                        </div>
                        <div className="select">
                            <FormControl  className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Sort by relevance</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e)=>this.sort(e)}
                                    label="Age"
                                    className={classes.selectEmpty}
                                >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="dsec">Price: High to Low</MenuItem>
                                <MenuItem value="asec">Price: Low to High</MenuItem>
                                <MenuItem value="alpha" > Sort By: (A-Z)</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="books">
                    <Grid container spacing={3} className={classes.card}>                      
                   
                        {currentBooks.map((book) => {
                            return <Grid item xs={3}>
                                <Paper className={classes.paper}>
                                    <BookCard book={book} bookDetails={this.bookDetails} bookInBag={this.bookInBag} getAllBooks={this.getAllBooks} getCartbookLength={this.props.getCartbookLength}></BookCard>
                                </Paper>
                            </Grid>
                            
                            {/* <div className="showbooks" onClick={(e)=>this.bookDetails(e,book)}>
                                <div className="bookimage">
                                    <img src={book1} alt=""  />
                                </div>
                                <div className="content">
                                    <div className="bookname"><strong>{book.bookName}</strong></div>
                                    <div className="author">by {book.author}</div>
                                    <div className="rating">
                                        <div className="rate">4.5 &#9733;</div>
                                    </div>
                                    <div className="price"><strong>Rs.{book.price}</strong></div>
                                </div>
                            </div> */}
                            })
                        }
                        </Grid>
                    </div>                
                </div>
                <Profiler id="pagination" onRender={this.profiler}>
                    <PaginationBar _books={this.props.searchBook? this.props.searchedData : this.state._books}
                        postsPerPage={this.state.postsPerPage}
                        currentPage={this.state.currentPage}
                        changepage={this.changepage}
                    />                  
                </Profiler>
                <Profiler id="footer" onRender={this.profiler}>
                    <Footer/>
                </Profiler>
                </>}      
            </>
        )
    }
}

export default withStyles(styles)(DisplayBook);