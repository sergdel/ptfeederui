import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { createBrowserHistory } from "history";
import { RootStore } from "./app/stores/createRootStore";
import { App } from "app";
import io from "socket.io-client";
import { onPatch, applyPatch } from "mobx-state-tree";
import { observable } from "mobx";

require("./theme/semantic.flatly.css");
require("./app/styles.global.css");

const history = createBrowserHistory();
const rootStore = RootStore(history);
const {
  settings,
  settings: { set },
  appSettings: { setLastData, dataLoaded, setConnected, persistSettingsToLS }
} = rootStore;

ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

try {
  const ls = localStorage.getItem("settings");
  if (ls) {
    set(ls);
  }
} catch (e) {
  console.log("unable to convert from local storage", e);
}

if (process.env.NODE_ENV !== "client") {
  const socket = io("http://localhost:8000");
  socket.on("server", function(data) {
    if (data.settings) {
      set(data.settings);
      if (!localStorage.getItem("settings")) {
        persistSettingsToLS(data.settings);
      }
      socket.emit("client", { info: "received settings" });
      setLastData(data.settings);
      dataLoaded();
    }
  });

  let timeout;
  socket.on("server", data => {
    if (data.info === "pulse") {
      setConnected(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log("no data received");
        setConnected(false);
      }, 8000);
    }
  });
}

const settingsHistory = observable([]);

setTimeout(
  () =>
    onPatch(settings, patch => {
      settingsHistory.push(patch);
      console.dir(patch);
    }),
  1000
);

if (process.env.NODE_ENV !== "production") {
  window["ap"] = x => applyPatch(settings, x);
  window["sh"] = settingsHistory;
  window["store"] = rootStore;
}
