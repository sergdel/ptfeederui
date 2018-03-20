import { History } from "history";
import { ComponentStore, ApplicationStore } from ".";
import { UI_DEFS, SETTINGS, APP_SETTINGS } from "../constants/stores";
import { RouterStore, SettingsStore } from ".";

export const RootStore = (history: History) => {
  return {
    routerStore: new RouterStore(history),
    [SETTINGS]: new SettingsStore(this).store,
    [UI_DEFS]: new ComponentStore(this).store,
    [APP_SETTINGS]: new ApplicationStore(this).store
  };
};
