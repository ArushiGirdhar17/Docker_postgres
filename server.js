const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 8080;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form/form.html");
});

app.post('/add', async (req, res) => {
  
  const f_name=req.body.fname;
  const mail = req.body.mail;
  const phone = req.body.phone;
  console.log(req.body);
  try {
    // try to send data to the database
    const query = `
      INSERT INTO Form(f_name, mail,phone)
      VALUES ($1,$2,$3)
    `;
    console.log(query);
    const values = [f_name, mail,phone];
      console.log(values);
      const result = await pool.query(query, values)
      const res1 = await pool.query("select * from Form")
      await pool.end();
     res.status(201).send(res1);
  } catch (err) {
    console.error(err);
    res.status(500).send('some error has occured');
  }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});