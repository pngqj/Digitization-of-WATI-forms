import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as enlargeActions from '../store/actions/enlarge';
import * as constants from '../Constants'
import NavBar from './Components/NavBar';
import LoginMenu from './Components/LoginMenu';
import Home from './Components/Home';
import StudentManagementPage from './Components/StudentManagementPage';

class CustomLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            fontSizeMenu: constants.fontSizeMenu,
            children:null, 
            margin: ""
        };
    }

    selectChildren = () =>{
        const pathname = window.location.pathname
        let children = null
        let margin = "5%"
        
        if(pathname.includes("forms") && pathname.length >6 ){
            // children = ( <TabManager {...this.props}/>)
            children = (<h1>Coming Soon!</h1>)
        } else if(pathname.includes("forms")){
            children = (<StudentManagementPage {...this.props}/>)
            window.onbeforeunload = undefined
        } else if(pathname === "/home"){
            children = (<Home {...this.props} />)
            window.onbeforeunload = undefined
            margin = "0%"
        } else if(pathname === "/account/login"){
            children = (<LoginMenu {...this.props}/>)
            window.onbeforeunload = undefined
        }

        this.setState({children, margin})
    }

    componentDidMount(){
        this.selectChildren()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.selectChildren()
        }
    }
  
    render() {
        const topMenuHeight = "50px"
        const bottomMenuHeight = "50px"
        return (
            <NavBar topMenuHeight={topMenuHeight} bottomMenuHeight={bottomMenuHeight}>
                <div style={{marginTop:topMenuHeight, marginBottom:bottomMenuHeight}}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));