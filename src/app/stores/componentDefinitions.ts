import { ComponentModel } from "./models/Components";
import UIConfig from "../config/config.json";
import { protect } from "mobx-state-tree";
export class ComponentStore {
  rootStore;
  store;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.store = ComponentModel.create(UIConfig);
    protect(this.store);
  }
}
