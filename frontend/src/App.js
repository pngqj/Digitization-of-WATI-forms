import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';
import Layout from './Main_Layout'

class App extends Component {

    componentDidMount() {
        // document.body.style.zoom = 1.25 //set default zoom 1.25x, make everything bigger
        this.props.onTryAutoSignup();
    }

    render() {
        return ( 
        <BrowserRouter>
            <Layout {...this.props}/>
        </BrowserRouter>
            );
        }
    }

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);