import { useState } from "react"
import styles from "../../styles/Sidebar.module.css"


const DetailsGuide = ({handleGuide, guides}) => {
    const [expand, setExpand] = useState(false);
    return (
        <div className = {styles.Box}>
            <button onClick={() => setExpand(!expand)}>Getting The Statistics &#8964;</button>
            {expand && <div className = {styles.innerBox}>
                <button onClick = {() => handleGuide(guides.Details)}>&bull; Mail / Text Details</button>
                <button onClick = {() => handleGuide(guides.Statistics)}>&bull; Statistics</button>
            </div>}
        </div>
    );
}
 
export default DetailsGuide;