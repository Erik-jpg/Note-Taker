const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => {
    // req.JSON.parse('./api/assets/notes')
    // how do I post this in the left hand side of the notes.html?
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});


app.get('/api/notes', (req, res) => {
    res.send.json('notes')
});

app.post('/api/notes', (req, res)=> {
    console.log("inside api note", req.headers)
    console.log(notes)
    const newEpistle = req.body
    newEpistle.id = notes.length
    notes.push(newEpistle)
    fs.writeFileSync('./db.db/json', JSON.stringify(notes))
    res.status(201).end()
    return res.json(notes) 
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    console.log('The note id is ', id);
    const filteredEpistles = notes.filter((note) => note.id !== parseInt(id));
    console.log(filteredEpistles);
    notes = filteredEpistles
    // will res.jason() work instead of ({ok: true})?
    return res.json();
})



const server = http.createServer(handleRequest)

app.listen(PORT, () => {
console.log(`server listening on: https//localhost:${PORT}`, "It's Alive!");
});