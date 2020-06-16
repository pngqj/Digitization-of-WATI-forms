import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';
import * as enlargeActions from './store/actions/enlarge';
import * as constants from './Constants'
import { BrowserView, MobileView } from "react-device-detect";
import DesktopLayout from './Desktop/DesktopLayout'
import MobileLayout from './Mobile/MobileLayout';
import { message } from 'antd';

class CustomLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            fontSizeMenu: constants.fontSizeMenu,
            children:null, 
            margin: ""
        };
    }

    redirectLink = () =>{
        const pathname = window.location.pathname
        const unauthenticated_paths = ['/home', '/account/login']

        if (pathname === "/"){
            this.props.history.push('/home')
        }
        if (this.props.username === null && !unauthenticated_paths.includes(pathname)){
            this.props.history.push('/home')
        } else if (this.props.isAuthenticated && pathname === "/"){
            this.props.history.push('/home')
        }
    }

    componentDidMount(){
        this.redirectLink()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.redirectLink()
        }
    }

    componentWillReceiveProps(nextProps){
        // if user confirm email
        // http://localhost:3000/confirmation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXQVRJX0ZPUk0iLCJzdWIiOiI1ZWE5MmE2YWQwZWQ5NzIyZGM2NDUyN2MiLCJpYXQiOjE1ODgxNDQ3NDcsImV4cCI6MTU4ODE0ODM0N30.AxwE7ijmUsQ7Pn_DclzCiNmPG0tQjQTulvpthh9Jdpc
        if (window.location.pathname.includes("/confirmation/")){
            const token = window.location.pathname.replace("/confirmation/", "")
            this.props.confirmEmail(token)
        }

        // if user login or logout, change path
        if(nextProps.isAuthenticated !== this.props.isAuthenticated){
            if(nextProps.isAuthenticated){
                if(!window.location.pathname.includes("/forms") && !window.location.pathname.includes("/home")){
                    this.props.history.push('/forms')
                } 
            } 
            else {
                if(!window.location.pathname.includes("/account/login") && !window.location.pathname.includes("/home")){
                    this.props.history.push('/home')
                } 
            }
        }
    }

  
  
    render() {
        return (
            <>
                <BrowserView>
                    <DesktopLayout {...this.props}/>
                </BrowserView>
                <MobileView>
                    {/* <MobileLayout {...this.props}/> */}
                    <h6>Mobile version this website is coming soon!</h6>
                </MobileView>
            </>
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