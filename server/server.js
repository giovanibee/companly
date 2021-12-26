const path = require('path');
const express = require('express');

const app = express();
const dist = path.resolve(__dirname, 'dist');
const port = process.env.PORT || 3000;

app.use('/', express.static(dist));
app.get('*', (_, res) => res.sendFile(path.resolve(dist, 'index.html')));
app.listen(port, () => console.log(`Listening ${dist} on port ${port}`));
