import React from 'react';
import Banner from '../../Images/banner_small.png';
import ScrollGif from '../../Images/scroll_down.gif';
import { message, Menu,} from 'antd';
const { SubMenu } = Menu;

const introData = [
    (
        <div id="text1">
            <h1>Introduction to WATI</h1>
            <p>The Wisconsin Assistive Technology Initiative (WATI) Assessment Package is a systematic, stepwise framework designed to help in the assistive technology (AT) decision-making process for students with disabilities in their customary environments.</p>
            <p>It is recommended that you collaborate and complete the WATI process as a team. Typical members of a WATI team may include: a special education teacher; the parent of the target student/the target student; a speech and language pathologist (SLP); a physical therapist (PT)/occupational therapist (OT); and an administrator.</p>
        </div>
    ),
    (
        <div id="text2">
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
    ),
    (
        <div id="text3">
            <h1>Instructions</h1>
            <p>Go through and complete the forms in the order presented above to be guided systematically through the AT decision-making process. It is emphasised however, that the order is only intended as a guide. We hope that you will be able to adapt and use the WATI framework flexibly in a way that will best meet the unique needs of your team.</p>
            <p>Click on the “Login” button to begin the WATI process.</p>
        </div>
    )
]

class Home extends React.Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount() {
    }

    render(){
        
        return (
            <div>
                {introData[0]}
                {introData[1]}
                {introData[2]}
            </div>
        )
    }
}

export default Home;