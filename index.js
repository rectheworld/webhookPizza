const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const pizzaPromo = require('./src/pizzaPromo')
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;

app.listen(
    port,
    () => console.log(`Pizza server running on port ${port}...`)
);

// Define a heartbeat request
app.get("/", (req,res) =>{
  return res.send("Hello Pizza!!!");
});

// Endpoing for Pizza Promo
app.post("/pizza", async (req,res) =>{
  const pizzaStatus = await pizzaPromo.orderPizza(JSON.parse(req.body.data))
  return res.json(pizzaStatus);
});