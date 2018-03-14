import * as React from "react";
import * as ReactDOM from "react-dom";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import { createBrowserHistory } from "history";
import { createStores } from "app/stores";
import { App } from "app";
require("./theme/semantic.flatly.css");
useStrict(true);

const history = createBrowserHistory();
const rootStore = createStores(history);

ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

(() => {
  rootStore.settings.fetch().then(() => {
    clearInterval(myInterval);
  });
  const myInterval = setInterval(rootStore.settings.fetch, 5000);
})();

if (process.env.NODE_ENV !== "production") {
  window["store"] = rootStore;
}
