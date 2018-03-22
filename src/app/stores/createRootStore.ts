import { History } from "history";
import { ComponentStore, ApplicationStore } from ".";
import { UI_DEFS, SETTINGS, APP_SETTINGS } from "../constants/stores";
import { RouterStore, SettingsStore } from ".";
import { autorun } from "mobx";
import _ from "lodash";

export const RootStore = (history: History) => {
  const appStore = new ApplicationStore(this).store;
  const componentStore = new ComponentStore(this).store;
  const settingsStore = new SettingsStore(this).store;
  autorun(() =>
    appStore.setOffsets(
      Object.keys(settingsStore.General).reduce((r, k) => {
        if (_.find(componentStore.ComponentTypes, { title: k, type: "Number" }))
          r.push(k + "Offset");
        else r.push(k);
        return r;
      }, [])
    )
  );
  return {
    routerStore: new RouterStore(history),
    [SETTINGS]: settingsStore,
    [UI_DEFS]: componentStore,
    [APP_SETTINGS]: appStore
  };
};
