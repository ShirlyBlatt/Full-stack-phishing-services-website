import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

import styles from "../../styles/Navbar.module.css"


// The navbar for all pages
function Navbar({menu, setMenu}) {
    const router = useRouter();

    // A fucntion to handle changing the send text / emails to go the their pages.
    const handleChange = (choice) => {
        // Routing to the choice
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
        <nav className = {styles.navbar}>
            <div className = {styles.logos}>
                {/* Logo and link to root page */}
                <Link onClick = {() => setMenu(false)} className = {styles.logo} href = "/">
                    <img src= "./logo.png" />
                </Link> 
                {/* BGU Logo and link to BGU university home page*/}
                <Link className = {styles.bgu} href = "https://in.bgu.ac.il/Pages/default.aspx">
                    <img src= "./bgu-logo2.png" />
                </Link>
            </div>
            <div className = {styles.menu}>
                {/* responsive menu logo */}
                <div className = {styles.hamburger} onClick = {() => setMenu(!menu)}>
                    <img src = "./hamburger.png" />
                </div>
                <Link href = "/home">Home</Link>
                <Link href = "/insertEmails">Insert Emails</Link>
                <Link href = "/insertNumbers">Insert Numbers</Link>
                {/* Type of phishing select button 
                    Used to route to the right page.
                */}
                <form>
                    <select 
                        onClick={(choice) => handleChange(choice.target.value)}>
                        <option value = {"/emailPhishing"}>Phishing Emails</option>
                        <option value = {"/textPhishing"}>Phishing Texts</option>
                    </select>
                </form>
                <Link href = "/project">Project</Link>
                <Link href = {loghref}>{log}</Link>
            </div>
        </nav>
    )
}

export default Navbar;