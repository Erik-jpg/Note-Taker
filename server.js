const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;
// const uuid = require('./helpers/uuid');
const allNotes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(('public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(allNotes);
})

app.post('/api/notes', (req, res)=> {
    console.log("inside POST notes", req.headers)
    const newNote = req.body
    newNote.id = allNotes.length
    allNotes.push(newNote)
    fs.writeFileSync('/db/db.json', JSON.stringify(allNotes))
    res.status(201).end()
    return res.json(allNotes)
});

app.delete('/api/notes/:id', (req, res) => {
        const deleteId = req.params.id;
        const dbArray = (JSON.parse(fs.readFileSync(__dirname + '/db/db.json', (err, data) => {
            if (err){
                throw new Error(err)
            } else {
                return data;
            }})))
            for(let i=0; i < dbArray.length; i++){
                if (dbArray[i].id === deleteId) {
                    dbArray.splice(i,1);
                }
            }
            fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(dbArray), (err) => {
                throw new Error(err)
            })
            res.send("Success! Note deleted.")
    });

// app.delete('/api/notes/:id', (req, res) => {
//     const dataBase = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', err => {throw new Error(err);}));
//     const filteredDb = dataBase.filter((item) => item.id !== req.params.id);

//     if(filteredDb.length < dataBase.length){
//         fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(filteredDb), (err) => {throw new Error(err);});
//         res.json(`Note || ${req.params.id} || successfully removed note.`);
//     } else {
//         res.json('Problem deleting the Note');
//     }
// });

app.listen(PORT, () => {
console.log(`server listening on: https//localhost:${PORT}`, "It's Alive!");
});