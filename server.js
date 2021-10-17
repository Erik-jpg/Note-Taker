const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
let notes = require('./db/db.json');
console.log(notes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(('public')));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/', async (req, res) => {
    // req.JSON.parse('./api/assets/notes')
    // how do I post this in the left hand side of the notes.html?
        res.sendFile(path.join(__dirname, 'index.html'));
    
});


app.get('/notes', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.post('/api/notes', (req, res)=> {
    console.log("inside POST notes", req.headers)
    console.log(notes)
    const newNote = req.body
    newNote.id = notes.length
    notes.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.status(201).end()
    return res.json(notes); 
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    console.log('The note id is ', id);
    const filteredNotes = notes.filter((note) => note.id !== parseInt(id));
    console.log(filteredNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    notes = filteredNotes
    // will res.jason() work instead of ({ok: true})?
    return res.json();
})



// const server = http.createServer(handleRequest)

app.listen(PORT, () => {
console.log(`server listening on: https//localhost:${PORT}`, "It's Alive!");
});