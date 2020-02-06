import React from 'react';
import { message, Form, Icon, Input, Button, Spin, Modal } from 'antd';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {
    state = {
        isLoggingIn: false,
        successShown: false,
        resend_email_modal_visible:false,
        reset_password_modal_visible:false,
        spinVisible:false,
        resetPwUsername: ''
    };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading === true){
        this.setState({isLoggingIn: true})
    }
    else if (this.state.isLoggingIn === true && nextProps.loading === false){
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token !== undefined && username !== undefined && token !== null && username !== null) {
            this.setState({isLoggingIn: false})
            this.props.handleModalClose()
        }
    } 

    let resend_email_modal_visible = nextProps.error === "email_not_verified" && this.props.error !== nextProps.error
    this.setState({
        resend_email_modal_visible:resend_email_modal_visible
    })
    

    if(nextProps.loading === false){
        this.setState({
            reset_password_modal_visible:false,
            spinVisible:false
        })
    }

    
  }

  render() {
        if (this.props.isAuthenticated){
            if(!this.state.successShown){
                this.setState({
                    successShown: true
                })
                message.success('Login Success!')
            }
            this.props.history.push('/')
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="Resend Email Confirmation"
                    visible = {this.state.resend_email_modal_visible}
                    okText="Resend"
                    onOk={() => {
                        this.props.resendEmailVerification()
                        this.setState({spinVisible:true})
                    }}
                    onCancel={() => this.setState({resend_email_modal_visible:false})}>
                        {
                            this.state.spinVisible ?
                            <Spin indicator={antIcon} />
                            :
                            "Account not activated. Resend Email?"
                        }
                </Modal>

                <Modal
                    title="Reset Password"
                    visible = {this.state.reset_password_modal_visible}
                    okText="Reset"
                    onOk={() => {
                        this.props.resetPassword(this.state.resetPwUsername)
                        this.setState({spinVisible:true})
                    }}
                    onCancel={() => this.setState({reset_password_modal_visible:false})}>
                        <br/>
                        {
                            this.state.spinVisible ?
                            <Spin indicator={antIcon} />
                            :
                            <Input onChange={(e)=>this.setState({resetPwUsername:e.target.value})} autoFocus prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        }
                </Modal>
                {
                    this.props.loading ?

                    <Spin indicator={antIcon} />

                    :

                    <Form onSubmit={this.handleSubmit} className="login-form">

                        <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input autoFocus prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                        </FormItem>

                        <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                        </FormItem>

                        <FormItem>
                        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                            Login
                        </Button>
                        Or 
                        <Button 
                            style={{marginRight: '10px'}} 
                            type={'link'}
                            onClick={this.props.handleChangeLoginType}> Sign Up
                        </Button>

                        <Button 
                            style={{float: 'right'}} 
                            type={'link'}
                            onClick={() => this.setState({reset_password_modal_visible:true})}> Forgot Password
                        </Button>

                        </FormItem>
                    </Form>
                }
        </div>
        );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
        resendEmailVerification: () => dispatch(actions.resendEmailVerification()),
        resetPassword: (username) => dispatch(actions.resetPassword(username)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrappedNormalLoginForm));