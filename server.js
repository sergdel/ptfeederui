const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/download", function(req, res) {
  var file = __dirname + "/src/config/config.json";
  res.download(file); // Set disposition and send it.
});

app.listen(port, () => console.log(`Listening on port ${port}`));
