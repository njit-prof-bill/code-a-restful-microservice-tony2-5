const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
let userData = []
let id = 0

app.post('/users', (req, res) => {
    userData.push({"id": id,...req.body})
    const user = userData.find(user => user.id == id)
    res.status(201).send(user)
    id++
})

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = userData.find(user => user.id == id)
    if(user) {
        res.status(200).send(user)
    } else {
        res.status(404).send("User not found")
    }
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = userData.find(user => user.id == id)
    if(user) {
        if(req.body.email && req.body.name) {
            user.name = req.body.name
            user.email = req.body.email
            res.status(200).send(user)
        } else if(req.body.name) {
            user.name = req.body.name
            res.status(200).send(user)
        } else if(req.body.email) {
            user.email = req.body.email
            res.status(200).send(user)
        }
        res.status(400).send("No update parameters passed")
    } else {
        res.status(404).send("User not found")
    }
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = userData.find(user => user.id == id)
    if(user) {
        userData = userData.filter(user => user.id != id)
        res.status(204).send()
    } else {
        res.status(404).send("User not found")
    }
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing