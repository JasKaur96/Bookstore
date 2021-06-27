import React,{useState, Component} from 'react';
import DisplayBook from '../../Components/DisplayBook/DisplayBook'
import Header from '../../Components/Header/Header'
import BookDetails from '../../Components/BookDetails/BookDetails';
import { withRouter } from 'react-router';

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state={ 
       selectedBook:"",
       details:false,
       open:false,
    }
}

onClickBook=(value)=>{
    this.setState({selectedBook:value})
    console.log(this.state.selectedBook,"selected book");
}

openCart=()=>{
  this.setState({open: !this.state.open})
  this.props.history.push("/cart")
}

render() {
  return (
    <div>
        <Header openCart={this.openCart}/>
        {this.state.selectedBook ? <BookDetails displayDetail={this.state.selectedBook}/>
          :<DisplayBook bookDetail={this.onClickBook}/>
        }
    </div>
  )
  }
}

export default withRouter(Dashboard);
  
