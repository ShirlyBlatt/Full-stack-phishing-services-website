import styles from "../styles/Datalist.module.css"


// A generic template that we will use to display certain lists
const DataList = ({dataBase, type, username}) => {

    // A function to handle deleting each element when the delete button has been clicked
    const handleDelete = async (data, name) => {
        const toDelete = {data, name, username};
        // sending an api request to delete the element
        await fetch('/api/'+ type +'FormApi', {
            method: 'PATCH',
            body: JSON.stringify(toDelete),
            headers: {"Content-Type": "application/json"},
        })
        // Refreshing the page for changes to take effect
        history.go(0);
    }

    return ( 
        <div className = {styles.list}>
                    {/* A generic template for creating a div for each element in the dataBase
                        Also contains a delete button to delete each element*/}
                    {dataBase.map((data) => (
                        <div key = {data.name}>
                            <h1>{data.name}</h1>
                            <p>{data.data}</p>
                            {type && <button onClick = {() => {handleDelete(data.data, data.name)}}>Delete {type}</button>}
                        </div>
                    ))}
        </div>
     );
}
 
export default DataList;