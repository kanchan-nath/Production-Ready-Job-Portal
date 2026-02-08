import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Auth.css"
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <button
            onClick={() => loginWithRedirect()}
            className="button login"
        >
            Log In
        </button>
    );
};

export default LoginButton;