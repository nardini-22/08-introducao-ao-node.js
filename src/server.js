const axios = require("axios");
const http = require("http");
const prompt = require("prompt");

prompt.start();


function onErr(err) {
  console.log(err);
  return 1;
}

const returnJSON = async (code) => {
  const response = await axios
    .get(`http://httpstat.us/${code}`)
    .catch((err) => console.log(err.response.data));
  return response;
};

const start = async (code) => {
  const api = await returnJSON(code);
  const desc = api.data.description;
  http
    .createServer((req, res) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(`
    Codigo: ${code} ${desc}
    `);
      res.end();
    })
    .listen(3000);
};

prompt.get(["code"], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log("Command-line input received:");
  console.log("Code: " + result.code);
  start(result.code);
});

