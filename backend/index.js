import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express()
var Uid = 0;
var n_id = 0;
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "UNNati@99",
    database: "SPOONACULAR"
})
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.json("This is the backend")
})
app.post("/Notes", (req, res) => {
    const q = "INSERT INTO Notes Values(?);";
    const values = [
        req.body.user_id,
        req.body.notesData,
        n_id


    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})
app.post("/SignUp", (req, res) => {
    const q = "INSERT INTO Users Values(?);";
    const values = [
        Uid,
        req.body.username,
        req.body.password
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})
app.get('/Recipes', (req, res) => {
    const q = "SELECT * FROM Recipes"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})
app.get('/Login', (req, res) => {
    const q = "SELECT * FROM Users"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})
app.get('/Notes', (req, res) => {
    const q = "SELECT * FROM Notes where user_id =?"
    const values = [
        req.query.user_id
    ]
    db.query(q, values, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})
app.get('/Info', (req, res) => {
    const q = "SELECT * FROM Nutrients_of_recipes t1 INNER JOIN Recipes t2 ON t1.RecipeID  = t2.RecipeID WHERE t2.RecipeID = ?;"
    const values = [
        req.query.recipeID
    ]
    db.query(q, values, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})
app.get('/Ingredients', (req, res) => {
    const q = "SELECT *FROM Ingredients t1 INNER JOIN Recipes_ingredients t2 ON t1.IngredientID =t2.IngredientID WHERE t2.RecipeID = ?;"
    const values = [
        req.query.recipeID
    ]
    db.query(q, values, (err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
})
app.delete('/Notes', (req, res) => {
    const q = "DELETE FROM Notes where n_id =?"
    const values = [
        req.query.n_id
    ]
    db.query(q, values, (err, data) => {
        console.log("Delete Successful!")
        if (err) return res.json(err)
        res.json(data)

    })
})
app.post("/Update", (req, res) => {
    const q = "UPDATE Notes SET `user_id` = ?,`notes`=?,`n_id`=? WHERE n_id = ?";
    const values = [
        req.body.user_id,
        req.body.notesData,
        req.body.n_id,
        req.body.n_id

    ];
    console.log()
    db.query(q, [...values], (err, data) => {
        if (err) return res.json(err)
        res.json(data)
        console.log("Update Successful!")
    })
})

app.listen(8080, () => {
    console.log("Connected to Backend")
})