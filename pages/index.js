import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../styles/Main.module.css'

// The Root page
export default function Index() { 
    const router = useRouter();
    return (
        <div className = {styles.main}>
            <Head>
                <title>Phishing Service</title>
                <meta name='viewport' content='"width=device-width, initial-scale=1'/>
            </Head>
            <div className = {styles.left}>
                <div>
                    <h1>Welcome to Haslishiya Phishing service</h1>
                    <h2>Start Phishing Today.</h2>
                    <div className= {styles.image}>
                        <img src= "./whatsapp.png" />
                        <img src= "./email.png" />
                    </div>
                </div>
                <div>
                    {/* Button for routing to the login page*/}
                    <button onClick={() => router.push('/api/auth/login')}>Login / Signup</button>
                    {/* Button for routing to the info page*/}
                    <button onClick = {() => router.push('/help')}>Get Started Guide</button>
                </div>
            </div>
            <div className = {styles.right}>
                <img  src = "./mainpage.jpg" />
            </div>
        </div>
  )
}