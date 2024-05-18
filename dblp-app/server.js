const express = require('express');
const app = express();
const port = 3000;

// Import routes
const indexRoute = require('./routes/index');
const fetchAuthorsRoute = require('./routes/fetchAuthors');
const authorsRoute = require('./routes/authors');

// Use routes
app.use('/', indexRoute);
app.use('/fetch-authors', fetchAuthorsRoute);
app.use('/authors', authorsRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


