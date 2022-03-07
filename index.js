const express = require('express');
const pizzaPromo = require('./src/pizzaPromo')
const app = express();

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
  const pizzaStatus = await pizzaPromo.orderPizza(req.body)
  return res.json(pizzaStatus);
});