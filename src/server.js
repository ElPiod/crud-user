const express = require('express'); // Fix the typo here
const path = require('path');
const app = express();
const port = 3001;

// Serve static files from the 'photos' directory
app.use('/photos', express.static(path.join(__dirname, 'photos')));

// Serve the db.json file
app.get('/users', (req, res) => {
  const db = require('./db.json');
  res.json(db.users);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
