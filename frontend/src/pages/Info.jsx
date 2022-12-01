import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
const Info = () => {
    const location = useLocation() //Use Location of url to get ID
    const recipeID = location.pathname.split('/')[2];
    console.log(recipeID)
    const [ingr, getIngredients] = useState([])
    const [info, getInfo] = useState([])

    const Adapter = (Nutrition_Value) => {
        if (Nutrition_Value) {
            return (true)
        }               //converts Integer to Bool
        else {
            return (false)
        }
    };
    useEffect(() => {
        const fetchAllIngredients = async () => {
            try {
                const res = await axios.get("http://localhost:8080/Ingredients", { params: { recipeID: recipeID } })
                getIngredients(res.data);
                console.log(res.data);  //Callling Node Server toget All Ingredinets
            } catch (err) {
                console.error(err);
            }
        }
        fetchAllIngredients()
    }, [])
    useEffect(() => {
        const fetchAllInfo = async () => {
            try {
                const res = await axios.get("http://localhost:8080/Info", { params: { recipeID: recipeID } })
                getInfo(res.data);
                console.log(res.data); //Callling Node Server toget All Nutritional  Info
            } catch (err) {
                console.error(err);
            }
        }
        fetchAllInfo()
    }, [])
    return (
        <div>
            <div>
                <ul>
                    <li><a class="active" href="http://localhost:3001/Recipes">Recipes</a></li>
                </ul>
            </div>
            <div className="infoParent">
                <div >
                    <Card.Title className="title">Ingredients </Card.Title>
                    {ingr.map((i) => (
                        <div style={{ width: '18rem' }} key={i.IngredientID}>

                            <li id="IngredientName">{i.Name}</li>

                        </div>



                    ))
                    }
                </div >
                <div className="recipesDetails" >
                    {info.map((i) => (
                        < Container className="card" >
                            <Card style={{ width: '18rem' }} key={i.RecipeID}>
                                <Card.Body>
                                    <Card.Title className="title">{i.Title} :Health Information</Card.Title>
                                    <li id="HealthScore">
                                        Health Score: {i.Health_Score}
                                    </li>
                                    {
                                        Adapter(i.Dairy) == true ?
                                            <li>Contains Dairy </li>
                                            :
                                            <li>Not Contain Dairy </li>


                                    }
                                    {
                                        Adapter(i.Gluten_Free) == true ?
                                            <li>Is Gluten_Free </li>
                                            :
                                            <li>Conatins Gluten </li>


                                    }
                                    {
                                        Adapter(i.Vegetarian) == true ?
                                            <li>Vegetarian Dish </li>
                                            :
                                            <li>Not Vegetarian </li>


                                    }
                                    {
                                        Adapter(i.Vegan) == true ?
                                            <li>Vegan Dish</li>
                                            :
                                            <li>Not Vegan </li>


                                    }

                                </Card.Body>
                            </Card>

                        </Container>

                    ))
                    }
                </div >

            </div>
        </div >
    )
}
export default Info


