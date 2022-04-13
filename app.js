const http = require('http');

const express = require('express');
const app = express();
const parser = require('body-parser');

const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('books_db.sqlite');

app.use(cors());
app.use(parser.json());

app.get('/books/:title',(req,res) => {
    const q = `SELECT * FROM books WHERE title like '%${req.params.title}%'`;
    db.all(q,(err,rows)=>{
        if(err) {
            res.send('Error querying db.');
        } else {
            res.send(JSON.stringify(rows));
        }
    });
});

app.post('/books/',(req,res) => {
    const book = req.body;
    const q = `insert into books ("author","title","genre","price") values ('${book.author}','${book.title}','${book.genre}','${book.price}')`;
    db.run(q,(err)=>{
        if(err) {
            res.send('Error executing query.');
        } else {
            res.send('The book has been added.');
        }
    });
});


app.listen(1717);

