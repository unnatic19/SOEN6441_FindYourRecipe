import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const [loginDetails, getUsers] = useState({
        username: "",
        password: ""
    });
    const [login, setUsers] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate()
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8080/Login")
                getUsers(res.data);
                console.log(res.data);
            } catch (err) {
                console.error(err); //Error Catching
            }
        }
        fetchAllUsers()
    }, [])
    const handleChange = (e) => {
        setUsers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleClick = e => {
        e.preventDefault();
        var flag = false;
        for (let i = 0; i < loginDetails.length; i++) {
            if (((login["username"]) === (loginDetails[i]["username"])) & ((login["password"]) === (loginDetails[i]["password"]))) { //Authenticating Login Credentials
                console.log("Logged In Successfully")
                localStorage.setItem('items', JSON.stringify(loginDetails[i]["user_id"]));
                flag = true;
                navigate("/Recipes")
                break
            }
        }
        if (!flag) {
            alert("Unsuccessful")   //Error Handling
        }
    };
    return (
        <div className="Notes">
            <div class="login-form">
                <form>
                    <h1>Login</h1>
                    <div class="content">
                        <div class="input-field">
                            <input type="text" placeholder="UserName" name="username" onChange={handleChange} />
                        </div>
                        <div class="input-field">
                            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        </div>
                    </div>
                    <div class="action">
                        <button onClick={handleClick}>Login</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default Login