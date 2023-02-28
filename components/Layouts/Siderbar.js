import CreateGuide from "../GuideExpanders/CreateGuide"
import InsertGuide from "../GuideExpanders/InsertGuide"
import GroupsGuide from "../GuideExpanders/GroupsGuide"
import PhishingGuide from "../GuideExpanders/PhishingGuide"
import DashboardGuide from "../GuideExpanders/DashboardGuide"
import DetailsGuide from "../GuideExpanders/DetailsGuide";
import { useState } from "react"

import styles from "../../styles/Sidebar.module.css"



const Sidebar = ({setInfoExpand, guides}) => {
    const [show, setShow] = useState(true);

    const handleGuide = async (guide) => {
        setInfoExpand(guide);
    }

    return ( 
        <div className = {styles.box}>
            <img onClick = {() => setShow(!show)} src= "./menu.png"/>
            {show && <div>
                <h1>Get Started Guide</h1>
                <CreateGuide handleGuide = {handleGuide} guides = {guides}/>
                <InsertGuide handleGuide = {handleGuide} guides = {guides}/>
                <GroupsGuide handleGuide = {handleGuide} guides = {guides}/>
                <PhishingGuide handleGuide = {handleGuide} guides = {guides}/>
                <DashboardGuide handleGuide = {handleGuide} guides = {guides}/>
                <DetailsGuide handleGuide = {handleGuide} guides = {guides}/>
            </div>}
        </div>
     );
}
 
export default Sidebar;