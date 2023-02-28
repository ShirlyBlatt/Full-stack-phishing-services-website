import { useState } from "react"
import styles from "../../styles/Sidebar.module.css"


const CreateGuide = ({handleGuide, guides}) => {
    
    const [expand, setExpand] = useState(false);
    return (
        <div>
            <button onClick={() => setExpand(!expand)}>Creating an account &#8964;</button>
            {expand && <div className = {styles.innerBox}>
                <button onClick = {() => handleGuide(guides.Signup)}>&bull; Signup</button>
                <button onClick = {() => handleGuide(guides.Login)}>&bull; Login</button>
                <button onClick = {() => handleGuide(guides.Verify)}>&bull; Verify</button>
            </div>}
        </div>
    );
}
 
export default CreateGuide;