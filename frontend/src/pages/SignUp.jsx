import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
    const [signup, setsignup] = useState({
        user_id: "",
        username: "",
        password: ""
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        setsignup((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    };
    const handleClick = async e => {
        e.preventDefault();
        try {
            console.log(signup)
            await axios.post("http://localhost:8080/SignUp", signup)
            navigate("/Login")
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="Notes">
            <div class="login-form">
                <form>
                    <h1>SignUp</h1>
                    <div class="content">
                        <div class="input-field">
                            <input type="text" placeholder="UserName" name="username" onChange={handleChange} />
                        </div>
                        <div class="input-field">
                            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        </div>
                    </div>
                    <div class="action">
                        <button onClick={handleClick}>Sign Up</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default SignUp