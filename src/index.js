import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";

import "./theme/semantic.flatly.css";

import { computed, observable } from "mobx";
import { observer } from "mobx-react";

class Store {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }
}

const store = new Store();
const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
