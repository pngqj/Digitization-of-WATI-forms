import { Form, Input, Button, Checkbox, message, Modal } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

class LoginMenu extends React.Component {
    state = {
        isSignUp:false,
        agreementModelVisible:false,
        resendEmailModelVisible: false
    }
    onSignUpFinish = signUpData => {
        this.props.signup(signUpData)
    };

    onSignUpFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    onLoginFinish = values => {
        this.props.signin(values.username, values.password, values.remember)
        this.setState({resendUsername: values.username, resendPassword: values.password})
    };

    onLoginFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.accountIsVerified === false && nextProps.accountIsVerified !== this.props.accountIsVerified){
            this.setState({resendEmailModelVisible:true})
        }
    }

    signUpForm = (
        <div>
            <Form
                // form={form}
                name="register"
                onFinish={this.onSignUpFinish}
                onFinishFailed={this.onSignUpFinishFailed}
                style={{margin:20}}
                >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!/.{8,}/.test(value)){
                                return Promise.reject('Password must be at least 8 characters long');

                            }
                            if (/(?=^[!@#$%\^&*()_\-+=\[{\]};:<>|\./?a-zA-Z\d]{7,}$)(?=([!@#$%\^&*()_\-+=\[{\]};:<>|\./?a-zA-Z\d]*\W+){1,})[!@#$%\^&*()_\-+=\[{\]};:<>|\./?a-zA-Z\d]*$/.test(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Passwords must contain at least 1 lower case letter, 1 upper case letter, 1 numeric character, and 1 special character');
                        },
                    })
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                    { validator:(_, value) => value ? Promise.resolve() : Promise.reject('You must accept the agreement') },
                    ]}
                >
                    <Checkbox>
                    I have read the <a style={{ color:"blue", textDecoration: "underline", textDecorationColor: "blue"}} 
                        onClick={(e)=> {
                            e.stopPropagation();
                            e.preventDefault();
                            this.setState({agreementModelVisible:true})
                        }}>agreement</a>
                    <a> </a>and understand and acknowledge the terms of use of this website.
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width:"100%"}}>
                    Register
                    </Button>
                </Form.Item>
                </Form>
                <p style={{textAlign:"center"}}>Already have an account? {(<a style={{ color:"blue", textDecoration: "underline", textDecorationColor: "blue"}} onClick={()=> this.setState({isSignUp:false})}>Sign In</a>)}</p>

        </div>
    )

    loginForm = (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    // test values
                    // username:"qunjia",
                    // password:"1234567Aa!",
                    remember: true,
                }}
                onFinish={this.onLoginFinish}
                onFinishFailed={this.onLoginFinishFailed}
                style={{margin:20}}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" style={{ color:"blue", textDecoration: "underline", textDecorationColor: "blue"}} onClick={()=> message.info("coming soon")}>
                Forgot password
                </a>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                    Log in
                    </Button>
                </Form.Item>
                </Form>

            <p style={{textAlign:"center"}}>Don't have an account? {(<a style={{ color:"blue", textDecoration: "underline", textDecorationColor: "blue"}} onClick={()=> this.setState({isSignUp:true})}>Sign Up</a>)}</p>
        </div>
    )

    agreementModel = (visible) => (
        <Modal
            visible={visible}
            title="Agreement"
            footer = {[<Button key="1" type="primary" onClick={()=>this.setState({agreementModelVisible:false})}>Close</Button>]}
            onCancel={()=>this.setState({agreementModelVisible:false})}
            >
            <p>
                At NIE/NTU, we recognise our responsibility to protect the information you provide to us.
            </p>
            <p>
                By continuing to use this website and by providing personal data (email address) to sign up for an account, you are consenting to NIE/NTU to use your personal data necessary for creation of your user account for use of this website. By entering personal data on this website, you are consenting to your personal data being used by NIE/NTU in this manner.
            </p>
            <p>
                Use of the WATI assessment forms on this website may involve input of personal data (including sensitive personal data) pertaining to your students/clients. By entering the personal data on this website, you acknowledge that you have obtained consent from your students/clients for the collection, use and/or disclosure of their personal data in this manner. 
            </p>
            </Modal>
    )

    resendEmailModel = (visible) => (
        <Modal
            visible={visible}
            title="Your account is not verified"
            okText="Yes"
            cancelText="No"
            onCancel={()=>this.setState({resendEmailModelVisible:false})}
            onOk={()=>{
                this.setState({resendEmailModelVisible:false})
                const {resendUsername, resendPassword} = this.state
                this.props.resendEmailVerification(resendUsername, resendPassword)
            }}
            >
                <p>Please verify your account by clicking the link sent to your E-mail Address.</p>
                <p>Would you like to resend the email verification link for your account?</p>
            </Modal>
    )

    render (){
        return (
            <div style={{background:"#505050", height:"100%", width:"100%", position: "fixed", left: 0, top: 0}}>
                {this.agreementModel(this.state.agreementModelVisible)}
                {this.resendEmailModel(this.state.resendEmailModelVisible)}
                <h2 style={{marginTop:"5%", color:"#ffffff", textAlign:"center"}}>W.A.T.I. Assessment Forms</h2>
                <div style={{background:"#ffffff", height:this.state.isSignUp? "75%":"45%", width:"33%", position: "fixed", left: "33%", top: "20%"}}>
                    {
                        this.state.isSignUp? this.signUpForm : this.loginForm
                    }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        accountIsVerified : state.auth.verified,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signin: (username, password, remember) => dispatch(actions.authLogin(username, password, remember)),
        signup: (signUpData) => dispatch(actions.authSignup(signUpData)),
        resendEmailVerification: (resendUsername, resendPassword) => dispatch(actions.resendEmailVerification(resendUsername, resendPassword)),
        resetPassword: (username) => dispatch(actions.resetPassword(username)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginMenu));