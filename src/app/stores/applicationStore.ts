import { ApplicationModel } from "./models";
export class ApplicationStore {
  rootStore;
  store;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.store = ApplicationModel.create();
  }
}
