import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ResponsiveMenu from "./ResponsiveMenu";

import styles from "../../styles/Graph.module.css"


// The layout for every page in the app.
// Will be using a navbar and a footer "between" each page
const Layout = ({children}) => {
    const [menu, setMenu] = useState(false);

    return ( 
            <div className = "layout">
                <Navbar menu = {menu} setMenu = {setMenu}/>
                {menu && <ResponsiveMenu menu = {menu} setMenu = {setMenu} />}
                {!menu && <div>
                    { children }
                </div>}
                <Footer setMenu = {setMenu}/>
            </div>
     );
}
 
export default Layout;