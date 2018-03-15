import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { createBrowserHistory } from "history";
import { createStores } from "app/stores";
import { App } from "app";
import io from "socket.io-client";
import { onPatch, applyPatch } from "mobx-state-tree";
import { autorun, observable } from "mobx";

require("./theme/semantic.flatly.css");
require("./app/styles.global.css");

const history = createBrowserHistory();
const rootStore = createStores(history);

const { settings, appSettings } = rootStore;

ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV !== "production") {
  window["store"] = rootStore;
}

const ls = localStorage.getItem("settings");

if (ls) {
  settings.set(ls);
}

if (process.env.NODE_ENV !== "client") {
  const socket = io("http://localhost:8000");
  socket.on("server", function(data) {
    if (data.settings) {
      settings.set(data.settings);
      if (!ls) {
        rootStore.appSettings.persistSettingsToLS(data.settings);
      }
      socket.emit("client", { info: "received settings" });
      appSettings.setLastData(data.settings);
      appSettings.dataLoaded();
    }
  });

  const { setConnected } = appSettings;

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

window["ap"] = x => applyPatch(settings, x);

autorun;
window["sh"] = settingsHistory;
