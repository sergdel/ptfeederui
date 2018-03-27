import { ApplicationModel } from "./models";
import { protect } from "mobx-state-tree";
export class ApplicationStore {
  rootStore;
  store;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.store = ApplicationModel.create({
      statusIndicators: [
        { MonitoredAltCoinTrendVersusBitcoin: 0 },
        { FolderName: 0 },
        { BasePairPriceChange: 0 }
      ]
    });
    protect(this.store);
  }
}
