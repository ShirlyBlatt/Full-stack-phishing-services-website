import Link from 'next/link'
import Head from 'next/head';

import styles from "../styles/404.module.css"


// This page will be displayed for any none "registered" pages
const NotFound = () => {
    return ( 
        <div className = {styles.not}>
            <Head>
                <title>Phishing Service | Oops</title>
                <meta name='viewport' content='"width=device-width, initial-scale=1'/>
            </Head>
            <h1>Ooooops...</h1> 
            <h2>This page cannot be found.</h2>
            <p>Go back to the <Link href="/">Homepage</Link></p>
        </div>
     );
}
 
export default NotFound;