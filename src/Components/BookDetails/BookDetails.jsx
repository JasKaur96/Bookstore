import React, { Component } from 'react';
import './DispalyBook.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import UserService from '../../Services/BookService';
import book1 from "../../Assets/book.png";
import { Button } from '@material-ui/core';
import Paginations from "@material-ui/lab/Pagination";
import PaginationBar from '../Pagination/Pagination';

const service = new UserService();

export default class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = ({          
            bookDetails: [],
            checkbook: false,
        })
    }

    getDetails = (value) => {
        this.setState({bookDetails : value})
        console.log("getDetails ", value)
    }
   

    render() {
        const LastBook = this.state.currentPage * this.state.postsPerPage;
        const FirstBook = LastBook - this.state.postsPerPage;
        console.log(this.state.books);
        const currentBooks = this.state.books.slice(FirstBook, LastBook);
        return (
            <>
                <div className="usercontent">
                    <div className="inlineheader">
                        <div className="headers">
                            Books
                        </div>
                    </div>
                    <div className="books">
                        {currentBooks.map((book, index) => {
                            return <div className="showbooks">
                                <div className="bookimage">
                                    <img src={book1} alt="" />
                                </div>
                                <div className="content">
                                    <div className="bookname">{book.bookName}</div>
                                    <div className="author">by{book.author}</div>
                                    <div className="rating">
                                        <div className="rate">4.5 &#9733;</div>
                                    </div>
                                    <div className="price">Rs.{book.price}</div>
                                </div>
                            </div>
                        })
                        }
                    </div>

                    <PaginationBar books={this.state.books}
                        postsPerPage={this.state.postsPerPage}
                        currentPage={this.state.currentPage}
                        changepage={this.changepage}
                    />

                </div>
            </>
        )
    }
}
