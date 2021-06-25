import React,{useState, Component} from 'react';
import DisplayBook from '../../Components/DisplayBook/DisplayBook'
import Header from '../../Components/Header/Header'
import BookDetails from '../../Components/BookDetails/BookDetails';

export default class Dashboard extends Component{
    constructor(props){
        super(props);
          this.state ={        
            selectedRout: true,
            books: []
          }
      }

    selectedNext=(value,selected)=>{
      this.setState({selectedRout: !this.state.selectedRout})
        this.setState({books: value});
        console.log("Dashboard", this.state.selectedRout)
        console.log("Book detail", this.state.books)

      }

    rendering = () =>{
        if(this.state.selectedRout === true){
            console.log("render inside")
            return <DisplayBook selectedNext={this.selectedNext}/>
    
          }else if (this.state.selectedRout === false){
            return <BookDetails />
          }
    }
  
    render(){
        return(
        <div>
            {/* <Header/>
            <DisplayBook /> */}
            <div className="dash">
                <Header rout={this.setRout} />                
                <div  className="dash">
                  {this.rendering()}                  
                </div>
            </div>
        </div>
     )}
}
