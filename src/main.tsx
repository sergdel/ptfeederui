import * as React from "react";
import * as ReactDOM from "react-dom";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import { createBrowserHistory } from "history";
import { createStores } from "app/stores";
import { App } from "app";
import io from "socket.io-client";
require("./theme/semantic.flatly.css");
require("./app/styles.global.css");
useStrict(true);
const history = createBrowserHistory();
const rootStore = createStores(history);

ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV !== "production") {
  window["store"] = rootStore;
}

const localSettings = localStorage.getItem("settings");
if (localSettings) rootStore.settings.set(JSON.parse(localSettings));

if (process.env.NODE_ENV !== "client") {
  const socket = io("http://localhost:8000");
  socket.on("server", function(data) {
    console.info(data);
    if (data.settings) {
      rootStore.settings.set(data.settings);
      socket.emit("client", { info: "received settings" });
      rootStore.appSettings.dataLoaded();
    }
  });

  const { setConnected } = rootStore.appSettings;

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
