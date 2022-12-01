import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
const Recipes = () => {
    const [recipes, getRecipes] = useState([])
    const openLinkInNewTab = (url) => {
        const newTab = window.open(url, '_blank', 'noopener,noreferrer');
        if (newTab) newTab.opener = null;
    }
    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const res = await axios.get("http://localhost:8080/Recipes")
                getRecipes(res.data);
                console.log(res.data); //Fetching All Recipes from server
            } catch (err) {
                console.error(err);
            }
        }
        fetchAllRecipes()
    }, [])
    return (
        <div>
            <div>
                <ul>
                    <li><a class="active" href="http://localhost:3001/Notes">Notes</a></li>
                    <li><a href="http://localhost:3001/" onClick={() => localStorage.clear()}>Logout</a></li>

                </ul>
            </div>
            <div className="recipesDetails" >
                {recipes.map((recipe) => (
                    < Container className="card" >
                        <Card style={{ width: '18rem' }} key={recipe.recipeID}>
                            <Card.Img variant="top" src={recipe.Image} />
                            <Card.Body>
                                <Card.Title id="recipeTitle">{recipe.Title} </Card.Title>
                                <button onClick={() => openLinkInNewTab(`${recipe.link}`)}>LINK TO RECIPE</button>
                                <button onClick={() => openLinkInNewTab(`http://localhost:3001/Info/${recipe.RecipeID}`)}>
                                    GET INFO
                                </button>
                            </Card.Body>
                        </Card>

                    </Container>

                ))
                }
            </div >


        </div >
    )
}
export default Recipes


