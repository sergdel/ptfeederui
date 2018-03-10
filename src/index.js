import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import { observable } from "mobx";
import axios from "axios";
import "./index.css";
import "./theme/semantic.flatly.css";

import {
  types,
  onSnapshot,
  applySnapshot,
  getSnapshot,
  flow
} from "mobx-state-tree";

const onReject = err => console.error(err);

const profitTrailer = {
  get: () =>
    axios
      .get("/settings")
      .then(results => {
        return results.data;
      })
      .catch(onReject)
};

const MenuItem = types.model("MenuItem", {
  Configs: types.array(types.frozen)
});

const GeneralSettings = types.model("General", {
  General: types.frozen,
  MenuItems: types.optional(types.frozen)
});

const Settings = types
  .model({
    settings: types.frozen
  })
  .actions(self => ({
    fetchSettings: flow(function* fetchSettings() {
      self.settings = {};
      try {
        self.settings = yield profitTrailer.get();
      } catch (e) {
        console.error("Failed to fetch projects", e);
      }
    })
  }));

const store = Settings.create();
store.fetchSettings().then(() => {});

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
