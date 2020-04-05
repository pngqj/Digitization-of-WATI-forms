import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';
import Layout from './Main_Layout'

import FormLayout from "./layout/FormLayout";
import { Input } from 'antd';
import FormManagementPage from './layout/FormManagementPage';

class App extends Component {

    componentDidMount() {
        // document.body.style.zoom = 1.25 //set default zoom 1.25x, make everything bigger

        this.props.onTryAutoSignup();

        fetch("http://localhost:5000/")
        .then(result =>{
            return result.json()
        }).then(result =>{
            console.log(result)
        })
    }

    render() {
        return ( 
        <BrowserRouter>
            <Layout {...this.props}>
                <Route exact path="/forms" component={() => <FormManagementPage {...this.props}/>} />
                <Route path="/forms/*" component={() => <FormLayout {...this.props}/>} />
            </Layout>
        </BrowserRouter>
            );
        }
    }

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);