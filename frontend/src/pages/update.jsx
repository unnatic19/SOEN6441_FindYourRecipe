import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Update = () => {
    const location = useLocation()
    const n_id = location.pathname.split('/')[2];
    var userid = JSON.parse(localStorage.getItem('items'));
    console.log(n_id)
    const [noteUpdate, updateNotes] = useState({
        user_id: userid,
        notesData: "",
        n_id: n_id
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        updateNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));//Extracting data from input tag

    };
    const handleClick = async e => {
        e.preventDefault();
        try {
            console.log(noteUpdate)
            await axios.post("http://localhost:8080/Update", noteUpdate)
            navigate("/Notes") //Updating the notes based on Note ID
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="Notes">
            <div>
                <ul>
                    <li><a class="active" href="http://localhost:3001/Recipes">Recipes</a></li>
                </ul>
            </div>
            <div>
                <div class="login-form">
                    <form>
                        <h1>Add Notes</h1>
                        <div class="content">
                            <div class="input-field">
                                <input type="text" placeholder="Notes" name="notesData" onChange={handleChange} />
                            </div>
                        </div>
                        <div class="action">
                            <button onClick={handleClick}>ADD</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default Update