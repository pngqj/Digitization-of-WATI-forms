import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as enlargeActions from '../store/actions/enlarge';
import * as constants from '../Constants'
import LoginMenu from './Components/LoginMenu';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { message } from 'antd';
import TabManager from "./formLayout/TabManager";
import StudentManagementPage from './Components/StudentManagementPage';

const navBarHeight = "8%"

class DesktopLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            fontSizeMenu: constants.fontSizeMenu,
            children:null, 
            margin: ""
        };
    }

    selectChildren = (isAuthenticated) =>{
        const pathname = window.location.pathname
        let children = null
        let margin = "5%"
        
        if(pathname.includes("forms")){
            const isform = pathname.split("/")[1] === "forms"
            if (!isform || !isAuthenticated){
                children = (<div></div>)
            } else if(pathname.length >6){
                children = ( <TabManager {...this.props}/>)

            } else{
                children = (<StudentManagementPage {...this.props}/>)
                window.onbeforeunload = undefined
            }
        } else if(pathname === "/home"){
            children = (<Home {...this.props} navBarHeight={navBarHeight}/>)
            window.onbeforeunload = undefined
            margin = "0%"
        } else if(pathname === "/account/login"){
            children = (<LoginMenu {...this.props} navBarHeight={navBarHeight}/>)
            window.onbeforeunload = undefined
        }

        this.setState({children, margin})
    }

    componentDidMount(){
        this.selectChildren()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.selectChildren(this.props.isAuthenticated)
        }
    }

    componentWillReceiveProps(nextprops){
        if (this.props.isAuthenticated !== nextprops.isAuthenticated) {
            this.selectChildren(nextprops.isAuthenticated)
        }
    }
  
    render() {
        return (
            <NavBar navBarHeight={navBarHeight}>
                <div style={{margin:this.state.margin, zIndex:-1}}>
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
        updateEnlarge: (isEnlarge) => dispatch(enlargeActions.updateEnlarge(isEnlarge)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopLayout));