import React,{useState, Component} from 'react';
import DisplayBook from '../../Components/DisplayBook/DisplayBook'
import Header from '../../Components/Header/Header'
import BookDetails from '../../Components/BookDetails/BookDetails';
import { withRouter } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Service from '../../Services/BookService';
import { connect } from 'react-redux';
import {BOOK_SELECTED} from '../../Constants/constantsBook';

const mapStateToProps = (state) => {
    console.log("state",state.state.bookDetails);
    return {
        selectedBook:state.state.bookDetails
    }
}

const service = new Service();

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state={ 
       selectedBook:"",
       details:false,
       open:false,
       cartbooks:""
    }
}
 
componentDidMount(){
  this.getCartbookLength();
}

onClickBook=(book)=>{
    // this.setState({selectedBook:value})
    // console.log(this.state.selectedBook,"selected book");
      this.setState({ selectedBook: book })
      console.log(book);
      this.props.dispatch({type:BOOK_SELECTED , value:book})
      this.props.history.push('/bookdetails')  
}

openCart=()=>{
  this.setState({open: !this.state.open})
  console.log("dashboard",this.state.open);
  this.props.history.push("/cart")
}

// display =()=>{
//   if(this.state.selectedBook){
//     this.props.history.push("/bookdetails")
//   }
// }

getCartbookLength=()=>{
  service.getCartItems().then((res) => {
    console.log(res);
    this.setState({cartbooks: res.data.result });
  })
}

render() {
  return (
    <div>
        <Header openCart={this.openCart} cartbooks={this.state.cartbooks.length} />
        {/* {this.state.selectedBook ? <BookDetails displayDetail={this.state.selectedBook}/>
          :<DisplayBook bookDetail={this.onClickBook}/>
        } */}

        <DisplayBook bookDetail={this.onClickBook} />
       
        <Footer/>
    </div>
  )
  }
}

export default connect(mapStateToProps) (withRouter(Dashboard))
