import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/Project.module.css"

// This page will display our project
// Additionaly we will use this page as a way to track recipients clicking the link they received
const Project = () => {
    const router = useRouter();
    // Getting the user, name, and id from the url arguments
    const logged = router.query.user;
    const name = router.query.name;
    const allocator = router.query.id;
    
    // A function to handle a user visiting the page with url arguments
    const handleSubmit = async () => {
        const filledForm = {data : logged, name : name.replaceAll('*', ' '), id : allocator};
        const response = await fetch('/api/loggersApi', {
            method: 'POST',
            body: JSON.stringify(filledForm),
            headers: {"Content-Type": "application/json"},
        }) 
    }
    // If url contains the 3 arguments, submit a logger using the arguments
    {logged && allocator && name && handleSubmit()}
    
    return (  
        <div>
            <Head>
                <title>Phishing Service | Project</title>
                <meta name='viewport' content='"width=device-width, initial-scale=1'/>
            </Head>
            <iframe className = {styles.pdf} src= "./Project.pdf"/>
        </div>
    );
}
 
export default Project;