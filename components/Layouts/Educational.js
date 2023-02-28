import Link from "next/link";

import styles from "../../styles/Busted.module.css"

// this will hold the links to the educational websites regarding phishing at the "clicked" page
const Educational = () => {
    return (
        <div className = {styles.sidebar}>
            <h1>Learn How To Avoid</h1>
            <h1> Phishing Scams</h1>
            <Link href = "https://www.phishing.org/10-ways-to-avoid-phishing-scams"
            target = "_blank">
                www.phishing.org
            </Link>
            <Link href = "https://www.occ.gov/topics/consumers-and-communities/consumer-protection/fraud-resources/phishing-attack-prevention.html"
            target = "_blank">
                www.occ.gov
            </Link>
            <Link href = "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams" 
            target = "_blank">
                www.consumer.ftc.gov
            </Link>
            <Link href = "https://support.microsoft.com/en-us/windows/protect-yourself-from-phishing-0c7ea947-ba98-3bd9-7184-430e1f860a44" 
            target = "_blank">
                www.microsoft.com
            </Link>
            <Link href = "https://www.lepide.com/blog/10-ways-to-prevent-phishing-attacks/" 
            target = "_blank">
                www.lepide.com
            </Link>
            <Link href = "https://www.consumers.org.il/item/fishing-sites" 
            target = "_blank">
                www.consumers.org | Hebrew
            </Link>
            <Link href = "https://support.google.com/websearch/answer/106318?hl=iw" 
            target = "_blank">
                www.google.com | Hebrew
            </Link>
        </div>
    );
}
 
export default Educational;