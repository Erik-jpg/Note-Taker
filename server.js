const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
let notes = require('./db/db.json');
const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(('public')));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const database = JSON.parse(fs.readFileSync(_dirname + '/db/db.json', 'utf8', err => {throw new Error(err);}));
    res.json(database);
});

app.post('/api/notes', (req, res)=> {
    console.log("inside POST notes", req.headers)
    if (req.body && req.body.title && req.body.text) {
        const newNote = req.body;
        newNote.id = uuid();

        const newDBArray = JSON.parse(fs.readFileSync(__dirname + 'db/db.json', 'utf8', err => {throw new Error(err);}));
        newDBArray.push(req.body);

        fs.writeFileSync(_dirname + '/db/db.json', JSON.stringify(newDBArray), (err) => {throw new Error(err);});
    res.status(newNote);
    } else {
        res.json('Error adding note.');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const database = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf8', err => {throw new Error(err);}));
    const filteredDb = database.filter((item) => item.id !== req.params.id);
    
    if(filteredDb.length < database.length){
        fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(filteredDb), (err) => {throw new Error(err);});
        res.json(`Note || ${req.params.id} || removed successfully 🚀`);
    } else {
        res.json('problem deleting note');
    }
});



// const server = http.createServer(handleRequest)

app.get('/*', (req, res) => {
    // req.JSON.parse('./api/assets/notes')
    // how do I post this in the left hand side of the notes.html?
        res.sendFile(path.join(__dirname, '/public/index.html'));
    
});

app.listen(PORT, () => {
console.log(`server listening on: https//localhost:${PORT}`, "It's Alive!");
});