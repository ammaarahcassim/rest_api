const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

let cars = [];

app.get("/cars", (request, response) => {
  response.json(cars);
});

app.get("/cars/:id", (request, response) => {
  const parsedID = parseInt(request.params.id);
  if (isNaN(parsedID))
    return response.status(400).send({ msg: "Bad Request. Invalid ID." });
  const findCarbyID = cars.find((car) => car.id === parsedID);
  if (!findCarbyID) return response.sendStatus(404);
  return response.send(findCarbyID);
});

app.post("/cars", (req, res) => {
  const newCar = {
    id: req.body.id,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    engineType: req.body.engineType,
  };

  cars.push(newCar);
  response.json(cars);
  return response.send(200);
});
