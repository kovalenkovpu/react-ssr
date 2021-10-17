import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "../../shared/App";

import "./index.scss";

ReactDOM.hydrate(
  <React.StrictMode>
    <Router>
      <App initialData={window.__APP_DATA__?.initialData}/>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
