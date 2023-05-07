const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.get("/", function (req, res) {
  res.json({ message: "Welcome to The new Topic JWT" });
});

const secretKey = "secretKey";
app.post("/login", function (req, res) {
  const user = {
    id: 1,
    username: "user",
    email: "user@example.com",
  };

  //pass three parameters
  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({ token });
  });
});

app.post("/profile", varifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res
        .status(200)
        .json({ message: "Congratulations you can access your profile" });
    }
  });
});

//this is only work for authenticated users and this function is only add token in request token
function varifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.send({ result: "token is invalid" });
  }
}

app.listen(8080, "127.0.0.1", () => {
  console.log("Connecting to server");
});
