const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const roster = require('./Routing/roster.json')
var cors = require('cors')
const bodyParser = require('body-parser')
const queries = require('./queries')
const db = require('./db.js')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))


// app.get('/roster', (req, res) => res.status(200).send(roster))

app.get('/roster', async (req, res) => {
  let roster = await db('roster')
  res.json({roster})
});

app.post('/roster', async (req, res) => {
  const postData = req.body;
  console.log('Post Data', postData)
  try {
    const newPerson = await db('roster').insert(postData)
    } catch (err) {
    res.status(500).json({message: "Error creating name.", error: err})
    }
    res.end()

});

app.delete('/roster', async (req, res) => {
  const postData = req.body;
  console.log('Post Data', postData)
  try {
    const newPerson = await db('roster').del().where('first',postData)
    } catch (err) {
    res.status(500).json({message: "Error deleting name.", error: err})
    }
    res.end()

});






app.post('/roster',function(req,res){
    roster.push({firstname: req.body.firstname, lastname: req.body.lastname})
});

app.delete('/roster',function(req,res){
    roster = roster.filter(function( obj ) {
        return obj.id !== req.id;
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

