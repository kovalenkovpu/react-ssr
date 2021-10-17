import axios from "axios";
import express from "express";
import fs from "fs";
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { User } from "shared/pages/Users";

import { App } from "../shared/App";

const PORT = process.env.PORT || 8080;
const app = express();

app.get(/\.(js|css|map|ico)$/, express.static("./client/build"));

app.get("*", async (req, res) => {
  let users: User[] | [] = [];

  if (req.url === '/users') {
    const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    users = data;
  }

  const sourceIndexHTML = fs.readFileSync("./client/build/index.html", {
    encoding: "utf8",
  });
  const initialData = { count: 20, users };
  const stringifiedApp = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App initialData={initialData}/>
    </StaticRouter>
  );
  const indexHTML = sourceIndexHTML.replace(
    '<div id="root"></div>',
    `
      <script>window.__APP_DATA__ = ${JSON.stringify({ initialData })};</script>
      <div id="root">${stringifiedApp}</div>
    `
  );

  res.contentType("text/html");
  res.status(200);

  res.send(indexHTML);
});

app.listen(PORT, () => {
  console.log(`Server started on the port ${PORT}`);
});
