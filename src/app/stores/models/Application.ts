import { types as t, applySnapshot } from "mobx-state-tree";
import { SETTINGS } from "../../constants/stores";
import axios from "axios";
import { observable, IObservableArray } from "mobx";
export const ApplicationModel = t
  .model({
    advancedMode: t.optional(t.boolean, false),
    selectedMenuItem: t.optional(t.string, "General"),
    dataFetched: false,
    connected: false,
    lastData: t.frozen,
    localStorageSettings: t.frozen,
    filter: t.optional(t.string, ""),
    offsets: t.optional(t.array(t.string), []),
    statusIndicators: t.optional(t.array(t.frozen), [])
  })
  .actions(self => ({
    setStatusIndicators(indicators: IObservableArray<object>) {
      self.statusIndicators = indicators;
    },
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
    setLastData: data => (self.lastData = data), //TODO how to reference another model
    setOffsets: offsets => (self.offsets = offsets)
  }))
  .actions(self => ({
    async afterCreate() {
      const keys: Array<string> = self.statusIndicators.reduce((a, c) => {
        return a.concat(Object.keys(c));
      }, []);
      await Promise.all(
        keys.map(key => {
          return axios.get("/status/" + key);
        })
      ).then(result => {
        self.setStatusIndicators(
          observable.array(
            keys.map((item, index) => {
              // if (isNaN(result[index]["data"])) return { [item]: "?" };
              return { [item]: result[index]["data"] };
            })
          )
        );
      });
    }
  }))
  .views(self => ({
    get isLoaded() {
      return self.dataFetched;
    }
  }));
