import React, { Component } from 'react';
import './DispalyBook.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import UserService from '../../Services/BookService';
import book1 from "../../Assets/book.png";
import PaginationBar from '../Pagination/Pagination';

const service = new UserService();

export default class DisplayBook extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sort: "",
            _books: [],
            _cartBooks: [],
            postsPerPage: "8",
            currentPage: "1",
            books: [],
            checkbook: false,
        })
    }

    componentDidMount() {
        this.getAllBooks();
    } 

    bookDetails = (e,value) =>{
        console.log("Book next page",this.state._books)
        console.log("Book page value",value)
        // this.props.onClickBook(value);
        // this.props.selectedNext(this.state._books)
        this.props.bookDetail(value);
    } 

    changepage = (e, newpage) => {
      
        console.log(e.target.value);
        this.setState({ currentPage: newpage });
    };

    storeBooks = (books) => {
        this.books = books;
        console.log("storBooks", this.books)

        return this.books;
    }

    getBooks = () => {
        return this.books;
    }

    handleChange = (event) => {
        this.setState({ sort: event.target.value });
    };

    getAllBooks = () => {
        var books = [];
        service.getAllBooks().then((res) => {
            books = res.data.result;
            var book = this.storeBooks(books);
            this.setState({ _books: book });
           
        }).catch((err) => {
            console.log(err);
        })
    }

    getBooks = () => {
        this.setState({
            _books: this.getBooks(),
        })
        console.log("get Books",this.state._books)
    }

    render() {
        const LastBook = this.state.currentPage * this.state.postsPerPage;
        const FirstBook = LastBook - this.state.postsPerPage;
        console.log(this.state._books);
        const currentBooks = this.state._books.slice(FirstBook, LastBook);
        return (
            <>
                <div className="usercontent">
                    <div className="inlineheader">
                        <div className="headers">
                            Books
                        </div>
                        <div className="select">
                            <FormControl variant="outlined" >
                                <InputLabel className="dropbox-content">sort by relevance</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    className="dropbox"
                                    value={this.state.sort}
                                    onChange={this.handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Price : low to high</MenuItem>
                                    <MenuItem value={20}>Price : high to low</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="books">
                        {currentBooks.map((book, index) => {
                            return <div className="showbooks"  onClick={(e)=>this.bookDetails(e,book)}>
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

                    <PaginationBar _books={this.state._books}
                        postsPerPage={this.state.postsPerPage}
                        currentPage={this.state.currentPage}
                        changepage={this.changepage}
                    />

                </div>
            </>
        )
    }
}
