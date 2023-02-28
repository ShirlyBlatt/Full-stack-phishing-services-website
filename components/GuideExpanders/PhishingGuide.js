import { useState } from "react";
import styles from "../../styles/Sidebar.module.css"


const PhishingGuide = ({handleGuide, guides}) => {
    const [expand, setExpand] = useState(false);
    return (
        <div className = {styles.Box}>
            <button onClick={() => setExpand(!expand)}>Phishing &#8964;</button>
            {expand && <div className = {styles.innerBox}>
                <button onClick = {() => handleGuide(guides.Templates)}>&bull; Templates</button>
                <button onClick = {() => handleGuide(guides.Sending)}>&bull; Sending Emails / Texts</button>
            </div>}
        </div>
    );
}
 
export default PhishingGuide;