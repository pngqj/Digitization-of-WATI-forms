import React from 'react';
import * as authActions from '../../store/actions/auth';
import * as enlargeActions from '../../store/actions/enlarge';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { MenuOutlined, RollbackOutlined, UserOutlined, InfoCircleOutlined, LoginOutlined, FormOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, List, message } from 'antd';

const menuColor = "#F5F5F5"
const fontColor = "#000000"

const OpenedMenu = (topMenuHeight, bottomMenuHeight, menuVisible) => {
    const display = menuVisible? "": "None"
    return (
        <div id="openedMenu" style={{display:display,opacity:0, background:"#ffffff", boxShadow: " 0px 0px 10px 2px #666666", margin:"20px", padding:"5px", position: "absolute", top: topMenuHeight, right: 0, bottom: bottomMenuHeight, left: 0,}}>
            <List
                size="large"
                bordered
                dataSource={['Login', 'Home']}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
    )
}

const TopNavBar = (topNavBarBtnOnClick, topMenuHeight) => {
    return (
        <div style={{boxShadow: " 0px 5px 5px 1px #999999", width:"100%", height:topMenuHeight, background:menuColor, position:"fixed", top:0}}>
            <h1 style={{padding:"5px", color:fontColor, fontSize:"30px", position:"absolute", marginLeft:"auto", marginRight:"auto", left:0, right:0, textAlign:"center"}}>WATI Forms</h1>
            <Button type="link" style={{position:"absolute", right:0}} onClick={()=>topNavBarBtnOnClick()}>
                <MenuOutlined style={{color:fontColor, fontSize:"30px"}}/>
            </Button>
        </div>
    )
}

const BottomNavBar = (isAuthenticated, selectedBottomNav, bottomNavBtnOnClick, bottomMenuHeight) => {
    const topPadding = "1px"
    const bottomPadding = "0px"
    const homeColor = selectedBottomNav === "home"? "#23A567" : "#000000"
    const formColor = selectedBottomNav === "forms"? "#23A567" : "#000000"
    const accountColor = selectedBottomNav === "account"? "#23A567" : "#000000"
    const loginColor = selectedBottomNav === "account/login"? "#23A567" : "#000000"
    const width = isAuthenticated? "33%" : "50%"
    return (
        <div style={{boxShadow: " 0px -1px 5px 1px #999999",width:"100%", height:bottomMenuHeight, background:menuColor, position:"fixed", bottom:0}}>
            <Button type="text" style={{width:width, height:"100%"}} onClick={()=> bottomNavBtnOnClick("home")}>
                <HomeOutlined style={{color:homeColor ,fontSize:"20px", position:"absolute", top: topPadding, left:0, right:0, textAlign:"center"}}/>
                <a style={{color:homeColor, fontSize:"20px", position:"absolute", bottom: bottomPadding, left:0, right:0, textAlign:"center"}}>Home</a>
            </Button>

            {
                isAuthenticated? 
                <Button type="text" style={{width:width, height:"100%"}} onClick={()=> bottomNavBtnOnClick("forms")}>
                <FormOutlined style={{color:formColor, fontSize:"20px", position:"absolute", top: topPadding, left:0, right:0, textAlign:"center"}}/>
                <a style={{color:formColor, fontSize:"20px", position:"absolute", bottom: bottomPadding, left:0, right:0, textAlign:"center"}}>Forms</a>
                </Button>
                :
                ""
            }

            {
                isAuthenticated? 
                <Button type="text" style={{width:width, height:"100%"}} onClick={()=> bottomNavBtnOnClick("account")}>
                    <UserOutlined style={{color:accountColor, fontSize:"20px", position:"absolute", top: topPadding, left:0, right:0, textAlign:"center"}}/>
                    <a style={{color:accountColor, fontSize:"20px", position:"absolute", bottom: bottomPadding, left:0, right:0, textAlign:"center"}}>Account</a>
                </Button>
                :
                <Button type="text" style={{width:width, height:"100%"}} onClick={()=> bottomNavBtnOnClick("account/login")}>
                    <LoginOutlined style={{color:loginColor, fontSize:"20px", position:"absolute", top: topPadding, left:0, right:0, textAlign:"center"}}/>
                    <a style={{color:loginColor, fontSize:"20px", position:"absolute", bottom: bottomPadding, left:0, right:0, textAlign:"center"}}>Login</a>
                </Button>
            }
            
        </div>
    )
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            menuVisible: false, 
            selectedBottomNav: "forms" 
        }
    }

    bottomNavBtnOnClick = (btnName) => {
        this.setState({
            selectedBottomNav: btnName
        })
        this.props.history.push('/' + btnName)
    }

    topNavBarBtnOnClick = () => {
        var fadeTarget = document.getElementById("openedMenu");
        let opacity = this.state.menuVisible? 1:0
        const isHide = this.state.menuVisible

        var fadeEffect = setInterval(function () {
            if (isHide && opacity > 0) {
                opacity -= 0.1
            } else if (!isHide && opacity < 1) {
                opacity += 0.1
            } else {
                clearInterval(fadeEffect);
            }
    
            fadeTarget.style.opacity = opacity;
        }, 30);

        this.setState({menuVisible:!this.state.menuVisible})

    }

    render() {
        return(
            <div>
                {this.props.children}
                {TopNavBar(this.topNavBarBtnOnClick, this.props.topMenuHeight)}
                {BottomNavBar(this.props.isAuthenticated, this.state.selectedBottomNav, this.bottomNavBtnOnClick, this.props.bottomMenuHeight)}
                {OpenedMenu(this.props.topMenuHeight, this.props.bottomMenuHeight, this.state.menuVisible)}

            </div>
            
        )
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