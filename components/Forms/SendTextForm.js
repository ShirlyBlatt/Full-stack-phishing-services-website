import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Phish.module.css"


// The form to send texts
const SendTextForm = ({username, body, setBody, template}) => {
    // Using states to capture the inputs from the forms filled by the user
    const [title, setTitle] = useState("");
    const router = useRouter();

    // A function to handle a user submitting a form
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const message = (template == "") ? body : template; 
        const filledForm = {username, title, message};  
        // Sending an api request to send texts using the form filled by the user
        // The texts will be sent to the users input numbers
        await fetch('/api/sendTextApi', {
            method: 'POST',
            body: JSON.stringify(filledForm),
            headers: {"Content-Type": "application/json"},
        })
        // Routing to the home page
        router.push('/home');
    }

    return ( 
        <div className={styles.textForm}>
            <h1>Send a New Phishing Text</h1>
            <form onSubmit={handleSubmit}>
                <label>Text Title:</label>
                {/* Title input field*/}
                <input
                    type = "text"
                    required
                    value = {title}
                    onChange = {(fill) => setTitle(fill.target.value)}
                />
                <label>Text Body:</label>
                {/* Message input field*/}
                <textarea
                    required
                    value = {body}
                    onChange = {(fill) => setBody(fill.target.value)}
                    disabled = {template != ""}
                ></textarea>
                <button>Send Text!</button>
            </form>
        </div>
     );
}
 
export default SendTextForm;