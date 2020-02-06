import React from 'react';
import { Modal,Layout, Menu, Icon, Affix, Switch, message} from 'antd';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';
import * as enlargeActions from './store/actions/enlarge';
import Login from './Account_Management/Login';
import Signup from './Account_Management/Signup';
import UserSettingsModal from './Account_Management/UserSettings_modal';
import * as constants from './Constants'
import * as formHandler from './layout/forms/FormHandler'


const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

const formSubMenu = (fontSizeMenu) => {
    let options = []
    for(let name in formHandler.form_names){
        let link = "/forms/" + name.split(" ").join("_")
        options.push(
            <Menu.Item key={name}>
                <Link style={{fontSize:fontSizeMenu}} to={link}>{name}</Link>
            </Menu.Item> 
        )
    }

    return(
    <SubMenu
        key="sub1"
        title={<span style={{fontSize:fontSizeMenu}}>Forms</span>}
      >
        {options}
  </SubMenu>
  )
}

class CustomLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            fontSizeMenu: constants.fontSizeMenu,
            loginType: "Login",
            loginModalVisible: false,
            logoutModalVisible: false,
            settingModalVisible: false
        };
    }

    componentDidMount(){
        this.props.getEnlarge()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isEnlarge !== null){
            if(nextProps.isEnlarge.enlarge){
                this.setState({fontSizeMenu:constants.fontSizeMenu})
            } else{
                this.setState({fontSizeMenu:constants.fontSizeMenuLarge})
            }
        }
    }

  

    authModels = () =>{
        return(
            <div>
                <Modal
                        title="Confirm Logout?"
                        visible={this.state.logoutModalVisible}
                        okText="Yes"
                        onOk={this.handleLogoutModalYes}
                        cancelText="No"
                        onCancel={this.handleModalClose}
                    >
                        <p>Do you want to logout?</p>
                    </Modal>
                    {/* LOGIN MODAL */}
                    <Modal
                        title={this.state.loginType}
                        visible={this.state.loginModalVisible}
                        footer={null}
                        onCancel={this.handleModalClose}
                    >
                    {
                        this.state.loginType === 'Login'?
                        <Login  handleModalClose={this.handleModalClose}
                                handleChangeLoginType={this.handleChangeLoginType}/>
                        :
                        this.state.loginType === 'Sign Up'?
                        <Signup handleModalClose={this.handleModalClose}
                                handleChangeLoginType={this.handleChangeLoginType}/>
                        :
                        ''
                    }  
                    </Modal>
                    {/* SETTING MODAL */}
                    <UserSettingsModal 
                        visible = {this.state.settingModalVisible}
                        handleModalClose = {this.handleModalClose} 
                        />
            </div>
        )
    }

    showLogoutModal = () => {
      this.setState({
        logoutModalVisible: true,
      });
    };
  
    handleLogoutModalYes = e => {
      this.props.logout();
      this.setState({
        logoutModalVisible: false,
      });
    };
  
    handleModalClose = e => {
      this.setState({
        loginModalVisible: false,
        logoutModalVisible: false,
        settingModalVisible: false

      });
    };

    showSettingModal = () =>{
        this.setState({
            settingModalVisible: true
        });
    }

    showLoginModal = () => {
    this.setState({
        loginModalVisible: true,
    });
    };

    handleChangeLoginType = () => {
        let loginType = this.state.loginType
        if (loginType === 'Login'){
            loginType = 'Sign Up'
        } else if (loginType === 'Sign Up'){
            loginType = 'Login'
        }
        this.setState({
            loginType: loginType
        })
    };
  
    render() {
        let path_name=window.location.pathname
        if (path_name.includes("/forms/")){
            path_name = path_name.replace("/forms/", "/form/")
            this.props.history.push(path_name)
        }
        return (
            <Layout className="layout" style={ {backgroundColor:"#47524d", backgroundSize: "100%"}}>
                {this.authModels()}
                <div>
                <Menu
                    onClick={this.handleClick}
                    theme= 'light'
                    style={{ 
                        backgroundColor:"#cddef7",
                        position: "fixed", 
                        width: "20%", 
                        top: "0",
                        zIndex: "0",
                        height: "100%",
                        padding: "20px",}}
                    defaultSelectedKeys={['1']}
                    mode="vertical"
                >
                    {formSubMenu(this.state.fontSizeMenu)}
                    <Menu.Item key={"login"}>
                        <span style={{fontSize:this.state.fontSizeMenu}} onClick={()=>{message.info("Coming soon!")}}>Login</span>
                    </Menu.Item>
                    <Menu.Item key={"create form"}>
                        <Link style={{fontSize:this.state.fontSizeMenu}} to={"/create_form"}>Create Form</Link>
                    </Menu.Item>
                    <Menu.Item key="enlarge">
                        <span style={{fontSize:this.state.fontSizeMenu}}>Enlarge </span>
                        <Switch checked={this.state.fontSizeMenu === constants.fontSizeMenuLarge} onChange={()=>this.props.updateEnlarge(this.state.fontSizeMenu !== constants.fontSizeMenu)}/>
                    </Menu.Item>
                </Menu>
                <div style={{ float:"right", width:"80%", display: "flex", flexFlow: "column", minHeight: "100vh"}}>
                    <Content style={{ borderStyle: 'solid', background: '#ffffff', margin:50, padding: '10px', flex: "1 1 auto"}}>
                    <div style={{padding: 24}}>
                        {this.props.children}
                    </div>
                    </Content>
                    <Footer style={{flex: "0 1 40px", textAlign: 'center' }}>
                    ©2020 Created by Png Qun Jia
                    </Footer>
                </div>
                
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        is_admin: state.auth.is_admin,
        isEnlarge: state.enlarge,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout()),
        getEnlarge: () => dispatch(enlargeActions.getEnlarge()),
        updateEnlarge: (isEnlarge) => dispatch(enlargeActions.updateEnlarge(isEnlarge))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));