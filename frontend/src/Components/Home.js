import React from 'react';
import Banner from '../Images/banner_small.png';
import ScrollGif from '../Images/scroll_down.gif';
import { message, Menu,} from 'antd';
const { SubMenu } = Menu;
class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showIndex:null,
            limitScroll:false
        }
    }
    
    componentDidMount() {
        this.handleScroll(true)
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = (immediate) => {
        immediate = immediate === true
        let scrollTop = window.scrollY
        scrollTop = scrollTop === undefined? document.documentElement.scrollTop : scrollTop //IE8 support
        
        const showIndex = Math.floor(scrollTop/100)
        const id_list = ["banner", "text1", "text2", "text3"]

        if(this.state.limitScroll){
            let scrollLimitLower = this.state.showIndex * 100
            let scrollLimitUpper = scrollLimitLower + 100
            if(scrollTop < scrollLimitLower){
                window.scrollTo(0, scrollLimitLower); 
            } else if(scrollTop > scrollLimitUpper){
                window.scrollTo(0, scrollLimitUpper); 
            }
        }

        else if(showIndex !== this.state.showIndex){
            if(id_list[showIndex] !== undefined){
                this.fadeEffect(id_list[showIndex], false, immediate)
                if( this.state.showIndex !== null){
                    this.fadeEffect(id_list[this.state.showIndex], true, immediate)
                }
                this.setState({
                    showIndex:showIndex,
                    limitScroll:true
                })
                setTimeout(() => {
                    this.setState({
                        limitScroll:false
                    })
                }, 300);
            } 
        }
    }

    

    fadeEffect(id, isHide, immediate) {
        var fadeTarget = document.getElementById(id);
        const defaultOpacity = isHide?1:0
        let opacity = defaultOpacity
        var fadeEffect = setInterval(function () {
            if (isHide && opacity > 0) {
                opacity -= 0.1
            } else if (!isHide && opacity < 1) {
                opacity += 0.1
            } else {
                clearInterval(fadeEffect);
            }

            if(!immediate){
                fadeTarget.style.opacity = opacity;
            } else{
                fadeTarget.style.opacity = (defaultOpacity+1)%2
                clearInterval(fadeEffect);
            }

        }, 30);
    }

    render(){
        const left = 200
        return (
            <div>
                <Menu
                    style={{width:200, height:1000, top:0, paddingTop:this.props.navBarHeight, position:"fixed", fontWeight:"bolder", fontSize:"20px"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    >
                    <Menu.Item key="1" >
                        Banner
                    </Menu.Item>
                    <Menu.Item key="2" >
                        Introduction
                    </Menu.Item>
                    <Menu.Item key="3" >
                        WATI Forms
                    </Menu.Item>
                    <Menu.Item key="4" >
                        Instructions
                    </Menu.Item>
                </Menu>
                
                <img id="scroll" style={{width:"10%", height:"10%", right:"40%", left:"50%",bottom:"0%", position:"fixed"}} src={ScrollGif}/>

                <div style={{minHeight:1000}}>
                    <img id="banner" style={{opacity:0, top:"10%", bottom:"20%",  position:"fixed", left:left}} src={Banner} alt="Picture of an inclusive classroom. A girl in a wheelchair is seated around a table with three other children, working on a task together using laptops. Four circles around the classroom scene depict different assistive technology devices – a visual schedule, tablet, refreshable Braille display, and wheelchair."/>

                    <div id="text1" style={{opacity:0,position:"fixed", padding:"5%", left:left, fontSize:"20px"}}>
                        <h1>Introduction to WATI</h1>
                        <p>The Wisconsin Assistive Technology Initiative (WATI) Assessment Package is a systematic, stepwise framework designed to help in the assistive technology (AT) decision-making process for students with disabilities in their customary environments.</p>
                        <p>It is recommended that you collaborate and complete the WATI process as a team. Typical members of a WATI team may include: a special education teacher; the parent of the target student/the target student; a speech and language pathologist (SLP); a physical therapist (PT)/occupational therapist (OT); and an administrator.</p>
                    </div>

                    <div id="text2" style={{opacity:0, position:"fixed", padding:"5%", left:left, fontSize:"20px"}}>
                        <h1>WATI Forms</h1>
                        <p>The WATI framework consists of 10 forms:</p>
                        <ul>
                            <li>WATI Assistive Technology Consideration Guide</li>
                            <li>WATI Assistive Technology Assessment Directions/Procedure Guide</li>
                            <li>Referral/Question Identification Guide</li>
                            <li>WATI Student Information Guide</li>
                            <li>Environmental Observation Guide</li>
                            <li>Environmental Observation Summary</li>
                            <li>WATI Assistive Technology Decision Making Guide</li>
                            <li>WATI Assistive Technology Assessment Technology Checklist</li>
                            <li>WATI Assistive Technology Trial Use Guide</li>
                            <li>WATI Assistive Technology Trial Use Summary</li>
                        </ul>
                    </div>

                    <div id="text3" style={{opacity:0, position:"fixed", padding:"5%", left:left, fontSize:"20px"}}>
                        <h1>Instructions</h1>
                        <p>Go through and complete the forms in the order presented above to be guided systematically through the AT decision-making process. It is emphasised however, that the order is only intended as a guide. We hope that you will be able to adapt and use the WATI framework flexibly in a way that will best meet the unique needs of your team.</p>
                        <p>Click on the “Login” button to begin the WATI process.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;