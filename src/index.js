import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import Store from "./Store";

import "./theme/semantic.flatly.css";

const Root = (
  <Provider store={Store}>
    <App />
  </Provider>
);
ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
