import { useState } from "react";
import styles from "../../styles/Sidebar.module.css"

const GroupsGuide = ({handleGuide, guides}) => {
    const [expand, setExpand] = useState(false);
    return (
        <div className = {styles.Box}>
            <button onClick={() => setExpand(!expand)}>Adding Groups &#8964;</button>
            {expand && <div className = {styles.innerBox}>
                <button onClick = {() => handleGuide(guides.AddGroup)}>&bull; Adding a Group</button>
                <button onClick = {() => handleGuide(guides.Select)}>&bull; Selecting a Group</button>
            </div>}
        </div>
    );
}
 
export default GroupsGuide;