import { Settings } from "./models/Settings";
import dummyData from "./dummyData";
import { protect } from "mobx-state-tree";

export class SettingsStore {
  root;
  store: typeof Settings.Type;
  constructor(rootStore) {
    this.root = rootStore;
    this.store = Settings.create(dummyData);
    protect(this.store);
  }
}
