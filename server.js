const express = require("express");
const app = express();
const port = 4000;
const {recipe} = require("./models");
require("dotenv").config();


app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      // the 'finish' event will be emitted when the response is handed over to the OS
      console.log(`Response Status: ${res.statusCode}`);
    });
    next();
  });
  app.use(express.json());

// Create a new recipe
app.post("/recipes", async (req, res) => {
  const recipeData = req.body;
  try {
    const newRecipe = await recipe.create(recipeData);
    res.status(201).json(newRecipe);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ errors: err.errors.map(e => e.message) });
    }
    console.error(err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});

app.get("/", (req, res) => {
    res.send("Welcome to recipe API!");
});

  // Get all recipes
app.get("/recipes", async (req, res) => {
    try {
      const allRecipes = await recipe.findAll();
  
      res.status(200).json(allRecipes);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  // Get a specific recipe
  app.get("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
  
    try {
      const recipeCall = await recipe.findOne({ where: { id: recipeId } });
  
      if (recipeCall) {
        res.status(200).json(recipeCall);
      } else {
        res.status(404).send({ message: "Recipe not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });
  

  // Update a specific recipe
  app.patch("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
  
    try {
      const [numberOfAffectedRows, affectedRows] = await recipe.update(
        req.body,
        { where: { id: recipeId }, returning: true }
      );
  
      if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
      } else {
        res.status(404).send({ message: "Recipe not found" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

// Delete a specific job
app.delete("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
  
    try {
      const deleteOp = await recipe.destroy({ where: { id: recipeId } });
  
      if (deleteOp > 0) {
        res.status(200).send({ message: "Recipe deleted successfully" });
      } else {
        res.status(404).send({ message: "Recipe not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });