import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
var userid = JSON.parse(localStorage.getItem('items'));
const Notes = () => {

    const [notes, getNotes] = useState([])
    const [userNotes, setNotes] = useState({
        user_id: userid,
        notesData: "",
        n_id: ""
    });//POST Body to send to The  Node  Server
    const openLinkInNewTab = (url) => {
        const newTab = window.open(url, '_blank', 'noopener,noreferrer');
        if (newTab) newTab.opener = null;
    }
    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const res = await axios.get("http://localhost:8080/Notes", { params: { user_id: userid } })
                getNotes(res.data);
                console.log(res.data[0]);
            } catch (err) {
                console.error(err);
            }
        }
        fetchAllNotes()
    }, [])
    const handleChange = (e) => {
        setNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleDelete = async (n_id) => {
        try {
            await axios.delete("http://localhost:8080/Notes", { params: { n_id: n_id } })
            window.location.reload()
        } catch (err) { //Deleting Note  Specific to the NoteID
            console.error(err);
        }
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            console.log(userNotes)
            await axios.post("http://localhost:8080/Notes", userNotes)
            window.location.reload()
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="Notes" >
            <div>
                <ul>
                    <li><a class="active" href="http://localhost:3001/Recipes">Recipes</a></li>
                </ul>
            </div>
            <div className="noteParent">
                <div className="noteSection">
                    <div>
                        {notes.map((note) => (
                            <div className="eachNote">
                                <p id="NotesDetails">{note.notes}</p>
                                <button className="delete" onClick={() => handleDelete(note.n_id)}>DELETE</button>
                                <button className="update" onClick={() => openLinkInNewTab(`http://localhost:3001/update/${note.n_id}`)} >Update</button>
                                {/* Redirecting to new html page to update */}
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="formSection" >
                    <div class="login-form" >
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
        </div >
    )
}
export default Notes