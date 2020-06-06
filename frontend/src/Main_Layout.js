import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';
import * as enlargeActions from './store/actions/enlarge';
import * as constants from './Constants'
import LoginMenu from './Components/LoginMenu';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { message } from 'antd';
import TabManager from "./formLayout/TabManager";
import StudentManagementPage from './Components/StudentManagementPage';

const navBarHeight = "50px"

class CustomLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            fontSizeMenu: constants.fontSizeMenu,
            children:null
        };
    }

    selectChildren = () =>{
        const pathname = window.location.pathname
        let children = null
        const unauthenticated_paths = ['/home', '/login']

        if (!this.props.isAuthenticated && !unauthenticated_paths.includes(pathname)){
            this.props.history.push('/home')
            // children = 
        } else if(pathname.includes("forms") && pathname.length >6 ){
            children = ( <TabManager {...this.props}/>)
        } else if(pathname.includes("forms")){
            children = (<StudentManagementPage {...this.props}/>)
            window.onbeforeunload = undefined
        } else if(pathname === "/home"){
            children = (<Home {...this.props}/>)
            window.onbeforeunload = undefined
        } else if(pathname === "/login"){
            children = (<LoginMenu {...this.props} navBarHeight={navBarHeight}/>)
            window.onbeforeunload = undefined
        }

        this.setState({children})
    }

    componentDidMount(){
        this.props.getEnlarge()
        this.selectChildren()
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.selectChildren()
        }
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
                if(!window.location.pathname.includes("/forms/") && !window.location.pathname.includes("/home/")){
                    this.props.history.push('/forms')
                } 
            } 
            else {
                this.props.history.push('/login')
            }
        }
    }

  
  
    render() {
        return (
            <NavBar navBarHeight={navBarHeight}>
                <div style={{margin:"5%"}}>
                    {this.state.children}
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