import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useState } from "react"

const Signup = () => {
    const navigate = useNavigate();
    const name = useField("text");
    const email = useField("email");
    const password = useField("password");
    const phoneNumber = useField("tel");
    const profilePicture = useField("text");
    const gender = useField("text");
    const dateOfBirth = useField("date");
    const [role, setRole] = useState("user")
    const street = useField("text");
    const city = useField("text");
    const state = useField("text");
    const zipCode = useField("text");


    const { signup, error, isLoading } = useSignup("/api/users/signup");

    async function signupUser(e) {
        e.preventDefault();
        await signup({
            name: name.value,
            email: email.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
            profilePicture: profilePicture.value,
            gender: gender.value,
            dateOfBirth: dateOfBirth.value,
            role,
            address: {
                street: street.value,
                city: city.value,
                state: state.value,
                zipCode: zipCode.value
            }
        });
        if (!error) {
            console.log("successful signup");
            navigate("/");
        }
    }

    return (
        <div className="create">
            {isLoading && <div>loading</div>}
            {error && <div>{error}</div>}
            {email && (
                <>
                    <h2>Sign Up</h2>
                    <form onSubmit={signupUser}>
                        <label>Name:</label>
                        <input {...name} />
                        <label>Email address:</label>
                        <input {...email} />
                        <label>Password:</label>
                        <input {...password} />
                        <label>Phone Number:</label>
                        <input {...phoneNumber} />
                        <label>Profile picture</label>
                        <input {...profilePicture} />
                        <label>Gender:</label>
                        <input {...gender} />
                        <label>Date of Birth:</label>
                        <input {...dateOfBirth} />
                        <label>Account Type:</label>
                        <select onChange={(e) => setRole(e.target.value)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                        </select>
                        <label>Street:</label>
                        <input {...street}/>
                        <label>City</label>
                        <input {...city}/>
                        <label>State</label>
                        <input {...state}/>
                        <label>Zip Code</label>
                        <input {...zipCode}/>
                        <button>Sign up</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default Signup
