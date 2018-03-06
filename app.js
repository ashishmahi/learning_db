const express = require('express');
const pg = require('pg');
const app = express();
app.use(express.urlencoded({
  extended: false
}));
let connectingString = 'postgres://localhost:5432/ashishm';
let client = new pg.Client(connectingString);
client.connect();

app.use((req,res,next)=>{console.log(req.url);next()});
app.use(express.static('./'));
app.post('/insert',(req,res)=>{
  let name = req.body.name;
  client.query(`INSERT INTO students(name) values($1)`,[name]);
  res.end(`successfully added row for ${name}`);
});

app.post('/fetch',(req,res)=>{
  let roll =req.body.roll;
  let qry = `SELECT * FROM students WHERE roll=$1`;
  client.query(qry,[parseInt(roll)],(err,resp)=>{
    if(err){
      console.log(err);
      return res.end(err)
    }
    res.end(JSON.stringify(resp.rows));
  });
})
module.exports = app;
