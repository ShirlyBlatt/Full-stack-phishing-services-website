import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

import styles from "../../styles/ResponsiveMenu.module.css"

const ResponsiveMenu = ({menu, setMenu}) => {
    const router = useRouter();

    // A fucntion to handle changing the send text / emails to go the their pages.
    const handleChange = (choice) => {
        // Routing to the choice
        setMenu(!menu)
        router.push(choice);
    }

    // Using a state for the current user
    const {user} = useUser();
    // If a user is not logged, display Login button
    var log = "Login"
    var loghref = "/api/auth/login"
    if (user) {
        // If a user is logged, display Logout button
        log = "Logout"
        loghref = "/api/auth/logout"
    }

    return ( 
        <div className = {styles.box}>
            <Link onClick = {() => setMenu(!menu)} href = "/home">Home</Link>
            <Link onClick = {() => setMenu(!menu)} href = "/insertEmails">Insert Emails</Link>
            <Link onClick = {() => setMenu(!menu)} href = "/insertNumbers">Insert Numbers</Link>
            <div className = {styles.phishing}>
                <Link onClick = {() => setMenu(!menu)} href = "/emailPhishing">Phishing Emails</Link>
                <Link onClick = {() => setMenu(!menu)} href = "/textPhishing">Phishing Texts</Link>
            </div>
            <Link onClick = {() => setMenu(!menu)} href = "/project">Project</Link>
            <Link onClick = {() => setMenu(!menu)} href = {loghref}>{log}</Link>
        </div>
    );
}
 
export default ResponsiveMenu;