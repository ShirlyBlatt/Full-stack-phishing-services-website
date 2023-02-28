import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

// Upon logging in, the user will be redicrted to the home page
export default handleAuth({
    async login(req, res) {
        await handleLogin(req,res, {
            returnTo: "/home",
        });
    },
});