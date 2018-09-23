const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static('./public/zadanieDnia'));

app.get('/', (req, res) => {
    let commentsCookieValue = req.cookies.comments
    let commentsList = readComments(commentsCookieValue)
    let view = commentsList.map(elem => {
        return `<li> Post: ${elem} </li>`
    })

    res.send(
        `
        <a href="add.html">Dodaj komentarz</a><br><br>
        <h2>Lista komentarzy:</h2>
				<ul>
        		${view}
				</ul>
        `
    );
})

app.post('/save', (req, res) => {
    let comment = req.body.comment;
    let commentsCookieValue = req.cookies.comments
    res.cookie('comments', addComment(commentsCookieValue, comment), { maxAge: 60000000 })
    res.send('<a href="/">Powrót do strony głównej</a>')
})

app.listen(3000, () => {
    console.log("Serwer uruchomiony na porcie 3000")
})

function addComment(commentsCookieValue, newComment) {
    const comments = readComments(commentsCookieValue);
    comments.push(newComment);
    return JSON.stringify(comments);
}

function readComments(commentsCookieValue) {
    return commentsCookieValue ? JSON.parse(commentsCookieValue) : [];
}
