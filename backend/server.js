require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Router imports
const mealRoutes = require('./routes/mealRouter');
const userRoutes = require('./routes/userRouter'); // Der Pfad zu deinem User Router
const userRecipesRoutes = require('./routes/userRecipesRouter'); // Der Pfad zu deinem User Recipes Router
const userMealsRoutes = require('./routes/userMealsRouter'); // Der Pfad zu deinem User Meals Router
const tempRouter = require('./routes/tempRouter');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/meal', mealRoutes);
app.use('/api/user', userRoutes); // Route für User
app.use('/api/recipes', userRecipesRoutes); // Route für User Recipes
app.use('/api/meals', userMealsRoutes); // Route für User Meals
app.use('/api/nutriCalc', tempRouter);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
