import { UserProvider } from '@auth0/nextjs-auth0'
import Layout from '../components/Layouts/Layout'

import '../styles/globals.css'

// Setting pages layout
function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
  )
}

export default MyApp
