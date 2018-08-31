import React, { Component } from 'react'
import { connect } from 'react-redux'
import { users } from '../reducers/users';

class Login extends Component{

    render(){
        const {users} = this.props
        console.log(users)

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