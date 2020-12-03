const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check request.
app.use((req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError("nums are required", 400);
    }

    let numbers = req.query.nums;
    empArr = [];

    let numbersArr = numbers.split(",");
    for (let each of numbersArr) {
      if (isNaN(parseInt(each))) {
        console.log("hey");
        throw new ExpressError(`${each} is not a number`, 400);
      }
    }
    next();
  } catch (e) {
    next(e);
  }
});

app.get("/mean", function (req, res) {
  let numbers = req.query.nums;
  empArr = [];
  let numbersArr = numbers.split(",");

  for (let each of numbersArr) {
    empArr.push(parseInt(each));
  }

  let total = 0;
  for (i = 0; i < empArr.length; i += 1) {
    total += empArr[i];
  }
  console.log(empArr);
  values = total / empArr.length;

  response = {
    operation: "mean",
    value: values,
  };
  return res.json(response);
});

app.get("/median", function (req, res) {
  nums = req.query.nums;

  return res.send(`${nums} great`);
});

app.get("/mode", function (req, res) {
  nums = req.query.nums;

  return res.send(`${nums} great`);
});

app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message;
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log("App on port 5000");
});
