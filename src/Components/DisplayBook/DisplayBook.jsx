import React, { Component,Profiler } from 'react';
import './DispalyBook.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'; 
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import UserService from '../../Services/BookService';
import book1 from "../../Assets/book.png";
import PaginationBar from '../Pagination/Pagination';
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const service = new UserService();

const styles = theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  });
  
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
        console.log("Book next page",this.state._books)
        console.log("Book page value",value)
        this.props.bookDetail(value);
    } 

    storeBooks = (books) => {
        console.log("StoreBooks");
        this.books = books;
       
        return this.books;
    }

    changepage = (e, newpage) => {      
        console.log(e.target.value);
        this.setState({ currentPage: newpage });
    };

    getBooks = () => {
        
        console.log("getBooks");
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
        console.log("Sort");
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
                // console.log("alpha sort  b ", b.bookName)
                if(a.bookName < b.bookName){
                    // console.log("alpha sort a", a.bookName) 
                    console.log("alpha sort  b ", b.bookName)
                    return -1;
                }
                return 0;
            })
            console.log("Sorted:",data)
            this.setState({_books : data})
        }
    }

    search = (FirstBook,LastBook) =>{
         if(this.props.searchedData != []){
            this.setState({ _books:this.props.searchedData});
            // this.setState({ _books:this.props.searchedData.slice(FirstBook, LastBook)})
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
            
            console.log("data",this.props.searchedData)
            
            this.handleClose();
        }).catch((err) => {
            console.log(err);
            this.handleClose();
        })
    }

    getBooks = () => {
        this.setState({
            _books: this.getBooks(),
        })
        console.log("Get Books method",this.state._books)
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
                            <select  className="dropbox-content" onChange={(e) => this.sort(e)} >
                                <option selected >  Sort by relevance</option>
                                <option value="dsec" > Price: high to low</option>
                                <option value="asec"  > Price: low to high</option>
                                <option value="alpha" > Sort By: (A-Z)</option>
                            </select>
                        </div>
                    </div>
                    <div className="books">
                   
                        {currentBooks.map((book) => {
                            return <div className="showbooks" onClick={(e)=>this.bookDetails(e,book)}>
                                <div className="bookimage">
                                    <img src={book1} alt=""  />
                                </div>
                                <div className="content">
                                    <div className="bookname"><strong>{book.bookName}</strong></div>
                                    <div className="author">by{book.author}</div>
                                    <div className="rating">
                                        <div className="rate">4.5 &#9733;</div>
                                    </div>
                                    <div className="price"><strong>Rs.{book.price}</strong></div>
                                </div>
                            </div>
                            })
                        }
                    </div>                
                </div>
                <Profiler id="pagination" onRender={this.profiler}>
                    <PaginationBar _books={this.state._books}
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