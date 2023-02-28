import { useState } from "react";
import styles from "../../styles/Templates.module.css"


// The email templates container
const EmailTemplates = ({setTemplate, templateID, setTemplateID}) => {
    const [show, setShow] = useState("Hide"); 

    // Using states to controll the template choice
    const set = (template, id) => {
        setTemplate(template);
        setTemplateID(id);
    }

    const showTemplates = () => {
        show == "Show" ? setShow("Hide") : setShow("Show");
    }

    return ( 
        <div className = {styles.email}>
            <h1>Email Templates:</h1>
            <button onClick = {() => showTemplates()}>{show} Templates</button>
            {show == "Hide" && <form className= {styles.templates}>
                {/* Setting each template with a radio button to choose from the templates*/}
                <div className = {styles.template}>
                    {/* Custom blank template*/}
                    <label>Blank:</label>
                    <div className = {styles.radio} onClick ={() => set("", "1")}>
                        <input
                            type = "radio" 
                            checked = {templateID == "1"}
                        />
                        <img className = {styles.image} src ="./blank-email.png" />
                    </div>
                </div>
                <div className = {styles.template} onClick ={() => set("d-71996524bad24c0e881ec6787dd222f8", "2")}>
                    {/* Custom template*/}
                    <label>Custom:</label>
                    <div className = {styles.radio}>
                        <input
                            type = "radio" 
                            checked = {templateID == "2"}
                            onChange
                        />
                        <img className = {styles.image} src ="./custom-email.png" />
                    </div>
                </div>
                <div className = {styles.template} onClick ={() => set("d-07a78a98578e4eb08b04286b4d45f10c", "3")}>
                    {/* Microsoft template*/}
                    <label>Microsoft:</label>
                    <div className = {styles.radio}>
                        <input
                            type = "radio" 
                            checked = {templateID == "3"}
                            onChange
                        />
                        <img className = {styles.image} src ="./microsoft-email.png" />
                    </div>
                </div>
                <div className = {styles.template} onClick ={() => set("d-848ac01a558448c3a9c9f223203c6006", "4")}>
                    {/* BGU template*/}
                    <label>BGU:</label>
                    <div className = {styles.radio}>
                        <input
                            type = "radio" 
                            checked = {templateID == "4"}
                            onChange
                        />
                        <img className = {styles.image} src ="./bgu-email.png" />
                    </div>
                </div>
            </form>}
        </div>
     );
}
 
export default EmailTemplates;