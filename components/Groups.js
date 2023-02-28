import styles from "../styles/Insert.module.css"


// the group list template
const Groups = ({username, groups, type, setGroups}) => {

    // A function to handle a user deleting a group
    const handleDelete = async (group) => {
        // sending an api request to delete the choosen group
        await fetch('/api/' + type + 'GroupApi', {
            method: 'DELETE',
            body: JSON.stringify({group, username}),
            headers: {"Content-Type": "application/json"},
        })
        // Refreshing the page for changes to take effect
        history.go(0);
    }

    // A function to handle a user choosing a group
    const handleClick = async (group) => {
        // Sending an api request to change the input email list of the user with the email list saved in the group
        await fetch('/api/' + type + 'GroupApi', {
            method: 'PATCH',
            body: JSON.stringify({group, username}),
            headers: {"Content-Type": "application/json"},
        })
        // Refreshing the page for changes to take effect
        history.go(0);
    }

    return ( 
        <div className = {"groups" + type}>
                    {/* Creating a div for each group with 2 buttons
                        a group button, to choose the group and switch the user input emails list to the group email list 
                        and a delete button to delete the group
                    */}
                    <div className = {styles.respGroups}>
                        <button className = {styles.hide} onClick = {() => setGroups(false)}>Hide Groups</button>
                        {groups.groups.map((data) => (
                            <div key = {data.group}>
                                <div className = {"group" + type} >
                                    <button onClick = {() => {handleClick(data.group)}}>{data.group}</button>
                                </div>
                                <div className= {styles.deleteButton}>
                                    {<button onClick={() => {handleDelete(data.group)}}>Delete Group</button>}
                                </div>
                            </div>
                        ))}
                    </div>
        </div>
     );
}
 
export default Groups;