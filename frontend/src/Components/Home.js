import React from 'react';
import Banner from '../Images/banner_small.png';
import Fade from 'react-reveal/Fade';
import { message } from 'antd';
import { fontSize } from '../Constants';

class Home extends React.Component {
    constructor(props){
        super(props)
        let scrollTop = window.scrollY
        scrollTop = scrollTop === undefined? document.documentElement.scrollTop : scrollTop //IE8 support
        const threshold = 10
        this.state={
            hideBanner:!(scrollTop > threshold)
        }

        
    }
    
    componentDidMount() {
        this.handleScroll(null)
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    
    handleScroll (event) {
        const immediate = event === null

        let scrollTop = window.scrollY
        scrollTop = scrollTop === undefined? document.documentElement.scrollTop : scrollTop //IE8 support
        const threshold = 10
        if(scrollTop > threshold && !this.state.hideBanner){
            this.setState({
                hideBanner:true
            });
            this.fadeEffect("banner", true, immediate)
            this.fadeEffect("text", false, immediate)
        } else if (scrollTop <= threshold && this.state.hideBanner){
            this.setState({
                hideBanner:false
            });
            this.fadeEffect("banner", false, immediate)
            this.fadeEffect("text", true, immediate)
        }
    }

    fadeEffect(id, fadeOutBanner, immediate) {
        var fadeTarget = document.getElementById(id);
        const defaultOpacity = fadeOutBanner?1:0
        let opacity = defaultOpacity
        var fadeEffect = setInterval(function () {
            if (fadeOutBanner && opacity > 0) {
                opacity -= 0.1
            } else if (!fadeOutBanner && opacity < 1) {
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

        }, 50);
    }

    render(){
        return (
            <div>
                {/* <Fade when={!this.state.hideBanner}> */}
                    <img id="banner" style={{opacity:0, height:"90%", width:"80%", position:"absolute", left:0, right:0, marginLeft:"auto", marginRight:"auto"}} src={Banner} alt="Picture of an inclusive classroom. A girl in a wheelchair is seated around a table with three other children, working on a task together using laptops. Four circles around the classroom scene depict different assistive technology devices – a visual schedule, tablet, refreshable Braille display, and wheelchair."/>
                {/* </Fade> */}

                {/* <Fade when={this.state.hideBanner}> */}
                    <div id="text" style={{opacity:0, padding:"5%", fontSize:"20px"}}>
                        <h1>Introduction to WATI</h1>
                        <p>The Wisconsin Assistive Technology Initiative (WATI) Assessment Package is a systematic, stepwise framework designed to help in the assistive technology (AT) decision-making process for students with disabilities in their customary environments.</p>
                        <p>It is recommended that you collaborate and complete the WATI process as a team. Typical members of a WATI team may include: a special education teacher; the parent of the target student/the target student; a speech and language pathologist (SLP); a physical therapist (PT)/occupational therapist (OT); and an administrator.</p>
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

                        <p>Go through and complete the forms in the order presented above to be guided systematically through the AT decision-making process. It is emphasised however, that the order is only intended as a guide. We hope that you will be able to adapt and use the WATI framework flexibly in a way that will best meet the unique needs of your team.</p>
                        <p>Click on the “Login” button to begin the WATI process.</p>
                    </div>
                {/* </Fade> */}
    
            </div>
        )
    }
}

export default Home;