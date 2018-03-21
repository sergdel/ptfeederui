import { ApplicationModel } from "./models";
import { protect } from "mobx-state-tree";
export class ApplicationStore {
  rootStore;
  store;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.store = ApplicationModel.create();
    protect(this.store);
  }
}
