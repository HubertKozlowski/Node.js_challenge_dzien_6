const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('./public/zadanie02/'));
app.use(bodyParser.urlencoded());

app.post('/cookie/set', (req, res) => {
    const {name} = req.body;
		res.cookie('name', name, {
        maxAge : 31536000000,
    });
    res.send('Zapisano imię: ' + name);
});

app.get('/cookie/show', (req, res) => {
		const myCookie = req.cookies.name;
		res.send('Wcześniej zapisane imię: ' + myCookie);
});

app.get('/cookie/check', (req, res) => {
		res.send(req.cookies ? `<h3>Są ciasteczka!</h3>` : `<h3>Nie ma ciasteczek</h3>`);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
