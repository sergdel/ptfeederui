import { ComponentModel } from "./models/Components";
import UIConfig from "../config/config.json";
export class ComponentStore {
  rootStore;
  store;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.store = ComponentModel.create(UIConfig);
  }
}
