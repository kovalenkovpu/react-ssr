import express from "express";
import fs from "fs";
import * as React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../client/src/App.jsx";

const PORT = process.env.PORT || 8080;
const app = express();

app.get(/\.(js|css|map|ico)$/, express.static("../client/build"));

app.use("*", (req, res) => {
  const sourceIndexHTML = fs.readFileSync("../client/build/index.html", {
    encoding: "utf8",
  });
  const stringifiedApp = ReactDOMServer.renderToString(<App />);
  const indexHTML = sourceIndexHTML.replace(
    '<div id="root"></div>',
    `<div id="root">${stringifiedApp}</div>`
  );

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

app.listen(PORT, () => {
  console.log(`Server started on the port ${PORT}`);
});
