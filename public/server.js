const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');


app.use(express.json());

app.get('/', (req, res) => {
res.send(`It's Alive! path Hit ${req.url}`);
});

app.get('/api/notes', (req, res) => {
    req.JSON.parse('./api/assets/notes')
    // how do I post this in the left hand side of the notes.html?
    res.send('../db/db.json')
})

app.post('/api/notes', (req, res) => {
    res.send.json('notes')
})



const server = http.createServer(handleRequest)

app.listen(PORT, () => {
console.log(`server listening on: https//localhost:${PORT}`);
});