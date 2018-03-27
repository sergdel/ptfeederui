import { ApplicationModel } from "./models";
import { protect } from "mobx-state-tree";
export class ApplicationStore {
  rootStore;
  store;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.store = ApplicationModel.create({
      statusIndicators: [
        { CurrentMarketConditions: 0 },
        { TopCoinChange: 0 },
        { BaseCoinPrice: 0 }
      ]
    });
    protect(this.store);
  }
}
