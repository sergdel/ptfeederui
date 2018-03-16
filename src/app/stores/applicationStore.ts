import { types as t } from "mobx-state-tree";
import { SETTINGS } from "../constants";

const AppSettings = t
  .model({
    advancedMode: t.boolean,
    selectedMenuItem: t.string,
    dataFetched: false,
    connected: false,
    lastData: t.frozen,
    localStorageSettings: t.frozen,
    filter: t.optional(t.string, "")
  })
  .actions(self => ({
    selectMenuItem: newMenuItem => (self.selectedMenuItem = newMenuItem),
    toggleAdvancedMode: mode => (self.advancedMode = mode),
    persistSettingsToLS: settings => {
      localStorage.setItem(SETTINGS, JSON.stringify(settings));
      self.localStorageSettings = settings;
    },
    getSettingsFromLS: () => {
      try {
        const settings = JSON.parse(localStorage.getItem(SETTINGS));
        self.localStorageSettings = settings;
        return settings;
      } catch (e) {
        console.log("error reading local storage", e.message);
      }
    },
    dataLoaded: () => (self.dataFetched = true),
    setFilter: v => (self.filter = v),
    setConnected: connected => (self.connected = connected),
    setLastData: data => (self.lastData = data) //TODO how to reference another model
  }))
  .views(self => ({
    get isLoaded() {
      return self.dataFetched;
    }
  }));

export const appSettings = AppSettings.create({
  advancedMode: false,
  selectedMenuItem: "General"
});
if (process.env.NODE_ENV !== "production") {
  window["appSettings"] = appSettings;
}
