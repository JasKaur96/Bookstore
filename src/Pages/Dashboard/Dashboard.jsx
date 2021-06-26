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
    this.setState({details:!this.state.details})
}
render() {
  return (
    <div>
        <Header/>
        {this.state.details ? <BookDetails displayDetail={this.state.selectedBook}/>
          :<DisplayBook bookDetail={this.onClickBook}/>
        }
    </div>
  )

  }
}
        // constructor(props){
    //     super(props);
    //       this.state = {  
    //         selectedbook:"",
    //         selectedRout: true,           
    //         check:null,
    //         books:[],
    //         searchBook: [],
    //         search: "",
            
    //       }
    //   }

    // selectedNext=(getbooks)=>{
    //   this.setState({selectedRout: !this.state.selectedRout})
    //   this.setState({books: getbooks})
    //     console.log("Dashboard", getbooks)
    //     this.onClickBook()
        
     
    //   }

    // onClickBook = (value) => {   
    //  this.setState({selectedbook:value});
    //  console.log("Selected book", this.state.selectedbook);
     
    // }

    // handleSearchBook = (value) => {
    //   this.setState({search: value});
    //   console.log("Dashboard seaarch method",value);
    //   console.log("Dashboard search Book ====>>>",this.state.search);
    // }
  
  
   

    // rendering = () =>{
    //     if(this.state.selectedRout === true){
    //         console.log("render inside")
    //         return <DisplayBook onClickBook={this.onClickBook} selectedNext={this.selectedNext} clickedBook={this.state.clickedBook}/>
    
    //       }else if (this.state.selectedRout === false){
    //         return <BookDetails book={this.state.check} clickedBook={this.state.clickedBook} onClickBook={this.onClickBook}/>
    //       }
    // }
  
    // render(){
    //     return(
    //     <div>
    //         {/* <Header/>
    //         <DisplayBook /> */}
    //         <div className="dash">
    //             <Header rout={this.setRout} search={this.state.search}  handleSearchBook={this.handleSearchBook} />                
    //             <div  className="dash">
    //               {this.rendering()}                  
    //             </div>
    //         </div>
    //     </div>
    //  )}
// }
