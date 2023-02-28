import Link from "next/link";

import styles from "../../styles/Footer.module.css"


// The footer for all pages
const Footer = ({setMenu}) => {
    return ( 
        <footer className = {styles.footer}>
            <p>Copyright 2022 השלישייה&#8482;</p>
            <Link onClick = {()=> setMenu(false)} href = "/help">Help</Link>   
        </footer>
     );
}
 
export default Footer;