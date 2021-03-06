import React from 'react';
import * as authActions from '../../store/actions/auth';
import * as enlargeActions from '../../store/actions/enlarge';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Modal, Input, Form, message } from 'antd';
import { RollbackOutlined, UserOutlined, InfoCircleOutlined, LoginOutlined, FormOutlined, HomeOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const ChangePasswordModel = ({ visible, onSubmit, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                form
                .validateFields()
                .then(values => {
                    form.resetFields();
                    onSubmit(values);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
            }}
        >
            <Form
                form={form}
                name="form_in_modal"
                style={{margin:20}}
                >
                
                <Form.Item
                    name="password"
                    label="Current Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your current password!',
                    }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
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
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
}

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            changePasswordVisible:false
        };
    }

    render() {
        const textFontSize = {fontSize:"20px"}
        const iconFontSize = {fontSize:"27px"}
        return (
            <div>
                <ChangePasswordModel
                    visible={this.state.changePasswordVisible}
                    onSubmit={(submitValues) => {
                        this.props.changePassword(this.props.username, submitValues)
                        this.setState({changePasswordVisible:false})
                        }}
                    onCancel={() => this.setState({changePasswordVisible:false})}
                />
                 <Menu style={{height:this.props.navBarHeight, width:"100%",top:0, position:"fixed", zIndex:1}} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                    
                    {
                        window.location.href.includes("forms/")?
                        <Menu.Item key="back">
                        <RollbackOutlined />
                        <Link to={"/forms"}>Back to Main Page</Link>
                        </Menu.Item>
                        :
                        ''
                    }

                    {
                        this.props.isAuthenticated?
                        <SubMenu
                            style={{float:"right"}}
                            title={
                                <>
                                <UserOutlined style={iconFontSize}/>
                                {/* {this.props.username} */}
                                <a style={textFontSize}>{this.props.username}</a>
                                </>
                            }
                            >
                            <Menu.Item key="setting:1" onClick={()=> this.setState({changePasswordVisible:true})}>Change Password</Menu.Item>
                            <Menu.Item key="setting:2" onClick={()=> this.props.logout()}>Logout</Menu.Item>
                        </SubMenu>
                        :
                        <Menu.Item key="login" style={{float:"right"}} icon={<LoginOutlined style={iconFontSize}/>}>
                            <Link to={"/account/login"} style={textFontSize}>Login</Link>
                        </Menu.Item>
                    }
                    
                    {
                        window.location.href.includes("home") && this.props.isAuthenticated?
                        <Menu.Item key="forms" style={{float:"right"}} icon={<FormOutlined style={iconFontSize}/>}>
                            <Link to={"/forms"} style={textFontSize}>Forms</Link>
                        </Menu.Item>
                        :
                        <Menu.Item key="home" style={{float:"right"}} icon={<HomeOutlined style={iconFontSize}/>}>
                            <Link to={"/home"} style={textFontSize}>Home</Link>
                        </Menu.Item>
                    }
                </Menu>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.username !== undefined,
        username: state.auth.username,
        isEnlarge: state.enlarge,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        changePassword: (username, submitValues) => dispatch(authActions.changePassword(username, submitValues)),
        logout: () => dispatch(authActions.logout()),
        getEnlarge: () => dispatch(enlargeActions.getEnlarge()),
        updateEnlarge: (isEnlarge) => dispatch(enlargeActions.updateEnlarge(isEnlarge))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));