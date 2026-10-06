const express = require("express");
const app = express();
const cors = require("cors");
const models = require("./models/index");
const routes = require("./routes/index");

require("dotenv/config");
require("./config/passport");

const corsOptions = {
  origin: "https://api-blog-frontend.netlify.app/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use("/posts", routes.post);
app.use("/user", routes.user);
app.use("/author", routes.author);

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({ error: error.toString() });
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${port}!`);
});
