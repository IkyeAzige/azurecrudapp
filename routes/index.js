/*
var express = require('express');
var router = express.Router();

const title = process.env.TITLE;
*/
/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title });
});

module.exports = router;
*/
var express = require('express');
var router = express.Router();
var { MongoClient } = require('mongodb');


const title = process.env.TITLE;

/* GET home page. */
router.get('/', function (req, res, next) {
  const url = process.env.URL;
  const password = process.env.PASSWORD;
  const user = process.env.USER;
  const dbName = 'library';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url, {
        auth: {
          user,
          password
        },
        useNewUrlParser: true

      }
      );

      const db = client.db(dbName);
      const books = await db.collection('books').find().toArray();
      //res.render('index', { books });
      res.json(books);

    } catch (err) {
      console.log(err);
    }
  }())
});

module.exports = router;
