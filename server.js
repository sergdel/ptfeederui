const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const router = express.Router();
router.use(morgan("combined"));

router.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-UserToken, Authorization, Session-ID, Session-Username, Auth-Environment, Mock-Mode"
  );
  response.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );
  response.header("Cache-Control", "no-cache, must-revalidate");
  response.header("Pragma", "no-cache");
  response.header("Expires", "-1");
  next();
});

router.use(bodyParser.json());

const handleError = (error, response) => {
  console.error("[ERROR] Request handler errored", error);
  response.sendStatus(500);
};

app.get("/download", function(req, res) {
  var file = __dirname + "/src/config/config.json";
  res.download(file); // Set disposition and send it.
});

app
  .route("/save")
  .post((req, res) => {
    if (!req.body.config) {
      return res.status(400).send("Config is required");
    } else return res.sendStatus(200, "ok");
  })
  .get((req, res) => res.send("hello"));

app.listen(port, () => console.log(`Listening on port ${port}`));
