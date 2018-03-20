import { types as t, applySnapshot } from "mobx-state-tree";
import { SETTINGS } from "../../constants/stores";

export const ApplicationModel = t
  .model({
    advancedMode: t.optional(t.boolean, false),
    selectedMenuItem: t.optional(t.string, "General"),
    dataFetched: false,
    connected: false,
    lastData: t.frozen,
    localStorageSettings: t.frozen,
    filter: t.optional(t.string, ""),
    offsets: t.optional(t.array(t.string), [])
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
    set: snapshot => applySnapshot(self, snapshot),
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
