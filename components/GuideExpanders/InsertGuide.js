import { useState } from "react";
import styles from "../../styles/Sidebar.module.css"


const InsertGuide = ({handleGuide, guides}) => {
    const [expand, setExpand] = useState(false);
    return (
        <div className = {styles.Box}>
            <button onClick={() => setExpand(!expand)}>Inserting Emails / Numbers &#8964;</button>
            {expand && <div className = {styles.innerBox}>
                <button onClick = {() => handleGuide(guides.Insert)}>&bull; Add Email / Number</button>
                <button onClick = {() => handleGuide(guides.Delete)}>&bull; Delete Email / Number</button>
            </div>}
        </div>
    );
}
 
export default InsertGuide;