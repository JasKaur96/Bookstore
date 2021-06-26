import React,{useState, Component} from 'react';
import DisplayBook from '../../Components/DisplayBook/DisplayBook'
import Header from '../../Components/Header/Header'
import BookDetails from '../../Components/BookDetails/BookDetails';

export default class Dashboard extends Component{
    constructor(props){
        super(props);
          this.state ={        
            selectedRout: true,
            clickedBook: null,
            check:null,
            books:[],
            searchBook: [],
            search: "",
            SearchedData:[]
          }
      }

    selectedNext=(getbooks)=>{
      this.setState({selectedRout: !this.state.selectedRout})
      this.setState({books: getbooks})
        console.log("Dashboard", getbooks)
        this.onClickBook()
        
      //  if(getbooks != null){
      //    let findBook = getbooks.find(findBook => findBook.getbooks == this.value);
      //    console.log("Find ", findBook)
      //    this.setState({check: findBook});  
      //    console.log("Book detail find ==>>>>>", this.state.check)
      // }
      }

    // findMethod = ()=>{

    // }

    onClickBook = (value) => {   
      console.log("Book name clicked",value)
      
      this.setState({clickedBook: value});  
      console.log("Book detail clicked", this.state.clickedBook)
      
      return value;
    }

    handleSearchBook = (value) => {
      this.setState({search: value});
      console.log("Dashboard seaarch method",value);
      console.log("Dashboard search Book ====>>>",this.state.search);
    }
  
  
   

    rendering = () =>{
        if(this.state.selectedRout === true){
            console.log("render inside")
            return <DisplayBook onClickBook={this.onClickBook} selectedNext={this.selectedNext} clickedBook={this.state.clickedBook}/>
    
          }else if (this.state.selectedRout === false){
            return <BookDetails book={this.state.check} clickedBook={this.state.clickedBook} onClickBook={this.onClickBook}/>
          }
    }
  
    render(){
        return(
        <div>
            {/* <Header/>
            <DisplayBook /> */}
            <div className="dash">
                <Header rout={this.setRout} search={this.state.search}  handleSearchBook={this.handleSearchBook} />                
                <div  className="dash">
                  {this.rendering()}                  
                </div>
            </div>
        </div>
     )}
}
