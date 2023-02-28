import Head from "next/head";
import { useRouter } from "next/router";
import Educational from "../components/Layouts/Educational";

import styles from "../styles/Busted.module.css"

//the page opens to a client who clocked the link from the mail/text

const Busted = () => {
    // This page will display our project
    // Additionaly we will use this page as a way to track recipients clicking the link they received
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
        <div className = {styles.box}>
            <Head>
                <title>Phishing Service | PHISHED</title>
                <meta name='viewport' content='"width=device-width, initial-scale=1'/>
            </Head>
            
            <div>
                <h1>PHISHED!</h1>
                <p>This message was sent to you to improve security.</p>
                <p>It could have end differently, be aware.</p>
                <img src="./busted.jpg"/>
            </div>
            <Educational />
        </div>
     );
}
export default Busted;



