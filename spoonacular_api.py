import requests
import mysql.connector
mydb = mysql.connector.connect( #connecting the Mysql Database
    host = "localhost",
    user = "root",
    password = "password123",
    database = "SPOONACULAR"
)
cursor = mydb.cursor() #creating Tables into the Mysql database
cursor.execute("CREATE TABLE Recipes (RecipeID int PRIMARY KEY,Title varchar(255),Image varchar(255));")
cursor = mydb.cursor()
cursor.execute("ALTER TABLE Recipes ADD link varchar(2083);")
cursor = mydb.cursor()
cursor.execute("CREATE TABLE Ingredients (IngredientID int PRIMARY KEY,Name varchar(255),Image varchar(255));")
cursor = mydb.cursor()
cursor.execute("CREATE TABLE Nutrients_of_recipes(RecipeID int ,Health_Score float,Dairy Bool,Gluten_Free Bool,Vegan Bool,Vegetarian Bool,ketogenic Bool ,FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID));")
cursor = mydb.cursor()
cursor.execute("CREATE TABLE Recipes_ingredients (Id int PRIMARY KEY,RecipeID int,IngredientID int,FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID));")
cursor = mydb.cursor()
cursor.execute("CREATE TABLE Notes(n_id int PRIMARY KEY,user_id int ,notes TEXT(65535) NOT NULL,FOREIGN KEY (user_id) REFERENCES Users(user_id));")
cursor = mydb.cursor()
cursor.execute("CREATE TABLE Users( user_id int PRIMARY KEY,username varchar(25) NOT NULL,password varchar(30) NOT NULL);")



response = requests.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=947e4837a7cd42b79f02aa8c8c63b488&addRecipeInformation=true") #Api Request To the server
results = response.json()
RecipeId=[]
for i in range(len(results["results"])):
    RecipeId.append(results["results"][i]["id"])

#RecipeTable Data Ingestion

RecipesDict={}
for i in range(len(RecipeId)):
    recipeInfo=[]
    recipeInfo.append(((results["results"][i]["title"]),(results["results"][i]["image"]),(results["results"][i]["sourceUrl"])))
    RecipesDict[RecipeId[i]]=recipeInfo #inserting values of recipe into a dictionarywherethe kye is the RecipeId 
for i in range(len(RecipeId)):  
    lst=[]
    lst=RecipesDict[RecipeId[i]]
    Title=lst[0][0]
    Image=lst[0][1]
    link=lst[0][2]
    sql="insert into Recipes values(%s,%s,%s,%s)" 
    cursor.execute(sql,(RecipeId[i],Title,Image,link))
mydb.commit()

#Ingredient Table

count=0
IngredientRecipe={}
for i in RecipeId:
    Ing=[]
    response2 = requests.get("https://api.spoonacular.com/recipes/%s/information?apiKey=840daa1d15064b43bf1d60c09918668b&includeNutrition=false"%i)
    results2 = response2.json()
    for j in range(len(results2["extendedIngredients"])):
        Ing.append(((count),(i),(results2["extendedIngredients"][j]["id"])))
        count=count+1 #inserting values of Ingredients into a dictionary where the kye is the IngredientID
    IngredientRecipe.append(Ing)

for i in range(len(IngredientRecipe)):
    for j in range(len(IngredientRecipe[i])):
        lst=IngredientRecipe[i]
        Id=lst[j][0]
        RecipeId=lst[j][1]
        IngredientId=lst[j][2] #inserting (RecipeID and respective ingredienntID) into  Recipe_Ingredients into a dictionary where the kye is the id count 
        print(IngredientId)
        sql="insert into Recipes_ingredients values(%s,%s,%s)" 
        cursor.execute(sql,(Id,RecipeId,IngredientId))
mydb.commit()
  
RecipesNutrients={}

for i in range(len(RecipeId)):
    Nutrients=[]
    Nutrients.append(((results["results"][i]["healthScore"]),(results["results"][i]["dairyFree"]),(results["results"][i]["glutenFree"]),(results["results"][i]["vegan"]),(results["results"][i]["vegetarian"])))     #inserting values of Nutrients into a dictionary where the kye is the IngredientID
    RecipesNutrients[RecipeId[i]]=Nutrients

for i in range(len(RecipeId)):
    lst=[]
    lst=RecipesNutrients[RecipeId[i]]
    healthScore=lst[0][0]
    dairyFree=lst[0][1]
    glutenFree=lst[0][2]
    vegan=lst[0][3]
    vegetarian=lst[0][4]
    sql="insert into Nutrients_of_recipes values(%s,%s,%s,%s,%s,%s)" 
    cursor.execute(sql,(healthScore,dairyFree,glutenFree,vegan,vegetarian,RecipeId[i]))
mydb.commit()

