require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Router imports
const userRoutes = require('./routes/userRouter'); // Der Pfad zu deinem User Router
const userRecipeRoutes = require('./routes/userRecipeRouter'); // Der Pfad zu deinem User Recipes Router
const userMealRoutes = require('./routes/userMealRouter'); // Der Pfad zu deinem User Meals Router
const offApiRouter = require('./routes/offApiRouter');


mongoose.set('useFindAndModify', false);        //already in beginning

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/user', userRoutes); // Route für User
app.use('/api/recipe', userRecipeRoutes); // Route für User Recipes
app.use('/api/meal/user', userMealRoutes); // Route für User Meals
app.use('/api/offApi', offApiRouter);

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
