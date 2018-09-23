const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('./public/zadanie01/'));
app.use(bodyParser.urlencoded());

app.post('/form', (req, res) => {
    const {num1, num2} = req.body;
		const success = `<h3>${num2} jest dzielnikiem ${num1}</h3>`;
		const failure = `<h3>${num2} nie jest dzielnikiem ${num1}</h3>`
    res.send(num1 % num2 !== 0 ? failure : success);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
