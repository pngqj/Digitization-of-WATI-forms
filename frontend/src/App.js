import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';
import * as enlargeActions from './store/actions/enlarge';
import MainLayout from './MainLayout';

class App extends Component {

    componentDidMount() {
        // document.body.style.zoom = 1.25 //set default zoom 1.25x, make everything bigger
        this.props.onTryAutoSignup();
        this.props.getEnlarge()
    }

    render() {
        return ( 
        <BrowserRouter>
            <MainLayout  {...this.props}/>
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
        getEnlarge: () => dispatch(enlargeActions.getEnlarge()),
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);