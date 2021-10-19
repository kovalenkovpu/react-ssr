import express from "express";
import fs from "fs";
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from 'react-router-dom';

import { App, APPDataInterface } from "../shared/App";
import { renderContent } from "./renderContent";
import { userRouter } from "./user/user-router";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("./client/build"));

app.use('/users', userRouter);

app.get("*", (req, res) => {
  const initialData: APPDataInterface = { users: [], user: null };
  const html = renderContent(req, initialData, {});
  
  return res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server started on the port ${PORT}`);
});
