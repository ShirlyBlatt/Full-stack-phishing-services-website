import { useState } from "react"
import styles from "../../styles/Sidebar.module.css"

const DashboardGuide = ({handleGuide, guides}) => {
    const [expand, setExpand] = useState(false);
    return (
        <div className = {styles.Box}>
            <button onClick={() => setExpand(!expand)}>Using The Dashboard &#8964;</button>
            {expand && <div className = {styles.innerBox}>
                <button onClick = {() => handleGuide(guides.Sent)}>&bull; Sent Emails / Texts</button>
            </div>}
        </div>
    );
}
 
export default DashboardGuide;