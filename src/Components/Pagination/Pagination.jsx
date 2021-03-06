import React, { Component } from 'react';
import Paginations from "@material-ui/lab/Pagination";

export default class Pagination extends Component {
 
    changePage = (e, newpage) => {
        this.props.changepage(e, newpage)
    };

    render() {
        return (
            <div className="paginationBlock">              
                <Paginations count={Math.floor(this.props._books.length / this.props.postsPerPage + 1)}
                    variant="outlined" shape="rounded" color="secondary" onChange={this.changePage}
                />                   
            </div>
        )
    }
}
