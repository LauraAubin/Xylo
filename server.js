const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/readFile", (request, response) => {
  const { file } = request.body;

  response.send({ fileContents: readFile(file) });
});

app.post("/writeFile", (request, response) => {
  const { file, contents } = request.body;

  response.send({ fileContents: writeFile(file, contents) });
});

function writeFile(file, contents) {
  return fs.writeFileSync(file, contents, "utf8");
}

function readFile(path) {
  return fs.readFileSync(path, "utf8");
}

app.listen(port, () => console.log(`Listening on port ${port}`));
