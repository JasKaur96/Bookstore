import React from 'react'
import { Redirect,Route } from 'react-router-dom'

class AuthRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('Token');
       console.log("Render Auth",this.props)
        return (

               <Route render={props => (
                    isAuthenticated && localStorage.getItem('Token') ?
                <Redirect to={"/home"} />
                :
                <Component {...props} />
        )} />
        )
    }
}

export default AuthRoute;