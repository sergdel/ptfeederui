const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, response, next) => {
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
  response.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

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

app.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    // `file` is the name of the <input> field of type `file`
    var old_path = files.file.path,
      file_size = files.file.size,
      file_ext = files.file.name.split('.').pop(),
      index = old_path.lastIndexOf('/') + 1,
      file_name = old_path.substr(index),
      new_path = path.join(process.env.PWD, '/src/config/config1.json');

    fs.rename(old_path, new_path, function(err) {
      console.log(err);
          if (err) {
            res.status(500);
            res.json({'success': false});
          } else {
            var obj = JSON.parse(fs.readFileSync(new_path, 'utf8'));
            res.status(200);
            res.json({'success': true, configobj: obj});
          }
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
