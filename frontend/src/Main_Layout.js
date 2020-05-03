import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';
import * as enlargeActions from './store/actions/enlarge';
import * as constants from './Constants'
import LoginMenu from './Components/LoginMenu';
import NavBar from './Components/NavBar';
import { message } from 'antd';

class CustomLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            fontSizeMenu: constants.fontSizeMenu,
        };
    }

    componentDidMount(){
        this.props.getEnlarge()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isEnlarge !== null){
            if(nextProps.isEnlarge.enlarge){
                this.setState({fontSizeMenu:constants.fontSizeMenu})
            } else{
                this.setState({fontSizeMenu:constants.fontSizeMenuLarge})
            }
        }

        // if user confirm email
        // http://localhost:3000/confirmation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXQVRJX0ZPUk0iLCJzdWIiOiI1ZWE5MmE2YWQwZWQ5NzIyZGM2NDUyN2MiLCJpYXQiOjE1ODgxNDQ3NDcsImV4cCI6MTU4ODE0ODM0N30.AxwE7ijmUsQ7Pn_DclzCiNmPG0tQjQTulvpthh9Jdpc
        if (window.location.pathname.includes("/confirmation/")){
            const token = window.location.pathname.replace("/confirmation/", "")
            this.props.confirmEmail(token)
        }

        // if user login or logout, change path
        if(nextProps.isAuthenticated !== this.props.isAuthenticated){
            if(nextProps.isAuthenticated){
                if(!window.location.pathname.includes("/forms/")){
                    this.props.history.push('/forms')
                }
            } else {
                this.props.history.push('/login')
            }
        }
    }

  
  
    render() {
        return (
            <NavBar>
            <div style={{margin:"5%"}}>
                {
                    this.props.isAuthenticated?
                    this.props.children
                    :
                    <LoginMenu></LoginMenu>
                }
            </div>
            
            </NavBar>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.username !== undefined && state.auth.username !== null,
        isEnlarge: state.enlarge,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        getEnlarge: () => dispatch(enlargeActions.getEnlarge()),
        updateEnlarge: (isEnlarge) => dispatch(enlargeActions.updateEnlarge(isEnlarge)),
        confirmEmail: (token) => dispatch(authActions.confirmEmail(token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));