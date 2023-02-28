
import { useState } from "react";
import styles from '../../styles/EmailForm.module.css'

// The form to add emails to input emails list
const EmailForm = ({username}) => {
    // Using states to capture the inputs from the forms filled by the user
    const[data, setEmail] = useState("");
    const[name, setName] = useState("");
    const[group, setGroup] = useState("");

    // A function to handle a user submitting a form
    const handleSubmit = async () => {
        const filledForm = {username, data, name};
        // Sending an api request to create an new input email using the form filled by the user
        await fetch('/api/EmailFormApi', {
            method: 'POST',
            body: JSON.stringify(filledForm),
            headers: {"Content-Type": "application/json"},
        })
        // Refreshing the page for changes to take effect
        history.go(0);
    }

    // A function to handle a user submitting a group
    const handleGroup = async () => {
        const filledGroup = {username, group};
        // Sending an api request to create an new group for emails using the current input emails of the user
        await fetch('/api/EmailGroupApi', {
            method: 'POST',
            body: JSON.stringify(filledGroup),
            headers: {"Content-Type": "application/json"},
        })
        // Refreshing the page for changes to take effect
        history.go(0);
    }

    // A function to handle a user deleting all of his input emails
    const handleClear = async () => {
        // Sending an api request to delete all emails from the users input email list
        await fetch('/api/EmailFormApi', {
            method: 'DELETE',
            body: JSON.stringify({username}),
            headers: {"Content-Type": "application/json"},
        })
        // Refreshing the page for changes to take effect
        history.go(0);
    }

    return ( 
        <div className = {styles.emailForm}>
            <div className = {styles.box}>
                <h1> Add a New Email</h1>
                <form onSubmit = {handleSubmit}>
                    <label>Email:</label>
                    {/* Email input field*/}
                    <input 
                        type = "text"
                        required
                        value = {data}
                        onChange = {(fill) => setEmail(fill.target.value)}
                        />
                    <label>Name:</label>
                    {/* Name input field*/}
                    <input 
                        type = "text" 
                        required
                        value = {name}
                        onChange = {(fill) => setName(fill.target.value)}
                    />
                    <button>Add Email</button>
                </form>
                <div className = {styles.groups}>
                    <label>Group Name:</label>
                    {/* Group name input field*/}
                    <input
                        type = "text"
                        required
                        value = {group}
                        onChange = {(fill) => setGroup(fill.target.value)}
                    />
                    <button onClick = {() => {handleGroup()}} >Save Group</button>
                </div>
                <div className = {styles.button}>
                    <button onClick={() => {handleClear()}}>Clear Emails</button>
                </div> 
                
            </div>
        </div>   
     );
}

export default EmailForm;