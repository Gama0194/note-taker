const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    const dbPath = path.join(__dirname, '../db/db.json');
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db);
  });

  app.post('/api/notes', (req, res) => {
    const dbPath = path.join(__dirname, '../db/db.json');
    const db = JSON.parse(fs.readFileSync(dbPath));

    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };

    db.push(newNote);

    fs.writeFileSync(dbPath, JSON.stringify(db));

    res.json(newNote);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const dbPath = path.join(__dirname, '../db/db.json');
    const db = JSON.parse(fs.readFileSync(dbPath));

    const noteId = req.params.id;

    const updatedDb = db.filter((note) => note.id !== noteId);

    fs.writeFileSync(dbPath, JSON.stringify(updatedDb));

    res.json({ message: 'Note deleted successfully' });
  });
};