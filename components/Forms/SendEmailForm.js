import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Phish.module.css"


// The form to send emails
const SendEmailForm = ({username, template, templateID}) => {
    // Using states to capture the inputs from the forms filled by the user
    const [from, setFrom] = useState("");
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("")
    const router = useRouter();

    // A function to handle a user submitting a form
    const handleSubmit = async (event) => {
        event.preventDefault();

        const filledForm = {username,from, title, subject, body, template, templateID};
        // Sending an api request to send emails using the form filled by the user
        // The emails will be sent to the users input emails
        await fetch('/api/SendEmailApi', {
            method: 'POST',
            body: JSON.stringify(filledForm),
            headers: {"Content-Type": "application/json"},
        })
        // Routing to the home page
        router.push('/home');
    }


    return ( 
        <div className={styles.emailForm}>
            <h1>Send a New Phishing Email</h1>
            <form method = "post" onSubmit = {handleSubmit}>
            <label>Email From:</label>
                {/* Title input field*/}
                <input
                    type = "text"
                    required
                    value = {from}
                    onChange = {(fill) => setFrom(fill.target.value)}
                />
                <label>Email Title:</label>
                {/* Title input field*/}
                <input
                    type = "text"
                    required
                    value = {title}
                    onChange = {(fill) => setTitle(fill.target.value)}
                />
                <label>Email Subject:</label>
                {/* Email subject input field*/}
                <input
                    type = "text"
                    required
                    value = {subject}
                    onChange = {(fill) => setSubject(fill.target.value)}
                    disabled = {templateID == "3" || templateID == "4"}
                />
                <label>Email Body:</label>
                {/* Email body input field*/}
                <textarea
                    required
                    value = {body}
                    onChange = {(fill) => setBody(fill.target.value)}
                    disabled = {templateID == "3" || templateID == "4"}
                ></textarea>
                <button>Send Email!</button>
            </form>
        </div>
     );
}
 
export default SendEmailForm;