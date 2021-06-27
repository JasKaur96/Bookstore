import React,{useState, Component} from 'react';
import DisplayBook from '../../Components/DisplayBook/DisplayBook'
import Header from '../../Components/Header/Header'
import BookDetails from '../../Components/BookDetails/BookDetails';

export default class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state={
       selectedBook:"",
       details:false
    }
}
onClickBook=(value)=>{
    this.setState({selectedBook:value})
    console.log(this.state.selectedBook,"selected book");
}
render() {
  return (
    <div>
        <Header/>
        {this.state.selectedBook ? <BookDetails displayDetail={this.state.selectedBook}/>
          :<DisplayBook bookDetail={this.onClickBook}/>
        }
    </div>
  )
  }
}
  
