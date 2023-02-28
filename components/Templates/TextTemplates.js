import { useState } from "react";

import styles from "../../styles/Templates.module.css"


// The text templates container
const Templates = ({setTemplate, setBody}) => {
    const [show, setShow] = useState("Hide"); 
    // Using a state to controll the template choice
    const [templateID, setTemplateID] = useState("1");

    const set = (template, id) => {
        setBody(template);
        setTemplate(template);
        setTemplateID(id);
    }

    const showTemplates = () => {
        show == "Show" ? setShow("Hide") : setShow("Show");
    }

    
    const template1 = "Hi everyone!\n\nCheck out our newest feature, it will make your life easier and will make you love us even more, if its even possible\n\n Check it out:"
    const template2 = "Hello,\nthis message is regarding the latest software update.\nPlease follow this link for the update:" 
    return ( 
        <div className = {styles.text}>
            <h1>Text Templates:</h1>
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
                        <img className = {styles.image} src ="./textdefault.png" />
                    </div>
                </div>
                <div className = {styles.template}>
                    {/* Bgu template*/}
                    <label>Template 1:</label>
                    <div className = {styles.radio} onClick ={() => set(template1, "2")}>
                        <input
                            type = "radio" 
                            checked = {templateID == "2"}
                        />
                        <img className = {styles.image} src = "./texttemplate.png" />
                    </div>
                </div>
                <div className = {styles.template} onClick ={() => set(template2, "3")}>
                    {/* Microsoft template*/}
                    <label>Template 2:</label>
                    <div className = {styles.radio}>
                        <input
                            type = "radio" 
                            checked = {templateID == "3"}
                        />
                        <img className = {styles.image} src = "./texttemplate3.png" />
                    </div>
                </div>
            </form>}
        </div>
     );
}
 
export default Templates;