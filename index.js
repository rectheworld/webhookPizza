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
    () => console.log(`Server Running On Port ${port}...`)
);

app.get("/", (req,res) =>{
  return res.send("Hello Pizza!!!");
});

app.post("/pizza", async (req,res) =>{
  /// Clean me Ren
  const pizzaStatus = await pizzaPromo.orderPizza(JSON.parse(req.body.data))
  return res.json(pizzaStatus);
});