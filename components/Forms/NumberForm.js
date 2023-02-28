import { useState } from "react";
import styles from '../../styles/NumberForm.module.css'


// The form to add numbers to input numbers list
const NumberForm = ({username}) => {
    // using states to capture the inputs from the forms filled by the user
    const[data, setNumber] = useState("");
    const[name, setName] = useState("");
    const[group, setGroup] = useState("");

    // A function to handle a user submitting a form
    const handleSubmit = async () => {
        const filledForm = {username, data, name};
        
        // Sending an api request to create an new input number using the form filled by the user
        await fetch('/api/NumberFormApi', {
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
        // Sending an api request to create an new group for numbers using the current input numbers of the user
        await fetch('/api/NumberGroupApi', {
            method: 'POST',
            body: JSON.stringify(filledGroup),
            headers: {"Content-Type": "application/json"},
        })
        // Refreshing the page for changes to take effect
        history.go(0);
    }

    // A function to handle a user deleting all of his input numbers
    const handleClear = async () => {
        await fetch('/api/NumberFormApi', {
            method: 'DELETE',
            body: JSON.stringify({username}),
            headers: {"Content-Type": "application/json"},
        })
        // Refreshing the page for changes to take effect
        history.go(0);
    }

    return ( 
        <div className = {styles.numberForm}>
            <div className = {styles.box}>
                <h1> Add a New Number</h1>
                <form onSubmit = {handleSubmit}>
                    <label>Number:</label>
                    {/* Number input field*/}
                    <input 
                        type = "text"
                        required
                        value = {data}
                        onChange = {(fill) => setNumber(fill.target.value)}
                        />
                    <label>Name:</label>
                    {/* Name input field*/}
                    <input 
                        type = "text" 
                        required
                        value = {name}
                        onChange = {(fill) => setName(fill.target.value)}
                    />
                    <div>
                        <button>Add Number</button>
                    </div>
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
                    <button onClick={() => {handleClear()}}>Clear Numbers</button>
                </div>
            </div>
        </div>   
     );
}

export default NumberForm;