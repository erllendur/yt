const express = require('express');
const exphbs  = require('express-handlebars');
const ytdl    = require('ytdl-core');

const app  = express();
const port = 3000;

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/play', async (req, res) => {
    const youtubeUrl = req.query.url;
    const info = await ytdl.getInfo(youtubeUrl);
    const audioUrl = info.formats.find(format => format.mimeType.includes('audio/mp4')).url;
    res.send({ audioUrl });
});


app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
