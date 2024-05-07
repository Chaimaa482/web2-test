var express = require('express');

const mongoose = require('mongoose');

const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

const uri = 'mongodb://127.0.0.1:27017/testWeb';
mongoose.connect(uri).then(console.log('Connected to MongoDb'))

const Schema = mongoose.Schema;

// Define a schema for the user collection
const userSchema = new Schema({
    nom: String,
    wilaya: String, 
    commune: String
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

app.post('/addUser', async (req, res) => {
    const { nom, wilaya, commune } = req.body;
    
    try {
        // Create a new user document based on the submitted data
        const newUser = new User({ nom, wilaya, commune });
        // Save the new user to the database
        await newUser.save();
        console.log('User added:', newUser);
        res.json(newUser);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Error adding user');
    }
});


app.get("/users", (req, res) => {
    User.find().then(function(e){
        res.json(e)
    })
})


app.listen(3031);
console.log("serveur http démarré sur le port 3031");

