const express = require('express');
var cors = require('cors')
const pizzaPromo = require('./src/pizzaPromo')
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 80;
app.listen(
    port,
    () => console.log(`Server Running On Port ${port}...`)
);

app.get("/", (req,res) =>{
  return res.send("Hello Pizza!!!");
});

app.post("/pizza", async (req,res) =>{
  /// Clean me Ren
  const pizzaStatus = await pizzaPromo.orderPizza(req.body)
  return res.json(pizzaStatus);
});