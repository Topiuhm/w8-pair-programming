import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const email = useField("email");
    const password = useField("password");

    const { login, error } = useLogin("/api/users/login");

    async function loginUser(e) {
        e.preventDefault();
        await login({ email: email.value, password: password.value });
        if (!error) {
            console.log("success");
            setIsAuthenticated(true);
            navigate("/");
        }
    };

    return (
        <div className="create">
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <label>Email address:</label>
                <input {...email} />
                <label>Password:</label>
                <input {...password} />
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Login