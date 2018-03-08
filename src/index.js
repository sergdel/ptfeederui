import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import { observable } from "mobx";
import axios from "axios";
import "./index.css";
import "./theme/semantic.flatly.css";
//create a store that resembles the incoming get request body

class Store {
  onReject = err => console.error(err);
  @observable
  data = {
  };
  @observable
  server = {
    get: () => {
      axios
        .get("/settings")
        .then(results => {
          this.data = results;
        })
        .catch(this.onReject);
    },

    set: () =>
      axios
        .post("http://localhost:5001/api/v1/app/settings")
        .catch(this.onReject)
  };

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
