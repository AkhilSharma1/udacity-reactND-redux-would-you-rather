import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component{

    render(){        


        return (
            <div>
                Login
            </div>
        )        
    }
}

function mapStateToProps({users}){
    return {
        users
        }
}

export default connect()(Login)