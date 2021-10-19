import * as React from "react";
import * as fs from 'fs';
import { Request } from 'express';
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";

import { App, APPDataInterface } from "../shared/App";
import path from "path";

interface RenderContent {
  (req: Request, initialData: APPDataInterface, context?: any): string;
}

const renderContent: RenderContent = (req, initialData, context = {}) => {
  const sourceIndexHTML = fs.readFileSync(
    path.resolve(__dirname, '../client/build/index.html'),
    { encoding: "utf-8" },
  );
  const stringifiedApp = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl} context={context}>
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

  return indexHTML;
};

export { renderContent };