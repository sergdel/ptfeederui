import axios from "axios";
import { types as t, applySnapshot, flow, getSnapshot } from "mobx-state-tree";
const onReject = err => console.error(err);
import { configure } from "mobx";
configure({ enforceActions: false });
import { List, Map } from "immutable";
export const profitTrailer = {
  get: () =>
    axios
      .get("/settings")
      .then(results => {
        console.log("got data");
        return results.data;
      })
      .catch(onReject),
  save: body =>
    axios
      .post("/save", body, {
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
      .then(results => console.log(results))
      .catch(onReject)
};

export const Settings = t
  .model("General", {
    General: t.model({
      BaseCurrency: t.optional(t.string, ""),
      BuyStrategy: t.optional(t.string, ""),
      BuyValue: t.optional(t.string, ""),
      MaxCost: t.optional(t.string, ""),
      MaxBuySpread: t.optional(t.string, ""),
      TrailingBuy: t.optional(t.string, ""),
      TrailingProfit: t.optional(t.string, ""),
      MinBuyBalance: t.optional(t.string, ""),
      MinBuyPrice: t.optional(t.string, ""),
      MinBuyVolume: t.optional(t.string, ""),
      MaxTradingPairs: t.optional(t.string, ""),
      SellStrategy: t.optional(t.string, ""),
      SellValue: t.optional(t.string, ""),
      DcaEnabled: t.optional(t.string, ""),
      HiddenCoins: t.optional(t.string, ""),
      DcaMaxBuySpread: t.optional(t.string, ""),
      DcaMaxBuyTimes: t.optional(t.string, ""),
      DcaMaxCost: t.optional(t.string, ""),
      DcaMinBuyBalance: t.optional(t.string, ""),
      DcaSellStrategy: t.optional(t.string, ""),
      DcaSellValue: t.optional(t.string, ""),
      DcaTrailingBuy: t.optional(t.string, ""),
      DcaTrailingProfit: t.optional(t.string, ""),
      ExcludedCoins: t.optional(t.string, ""),
      SomOnlyCoins: t.optional(t.string, ""),
      MinutesForLongerTermTrend: t.optional(t.string, ""),
      MinutesToMeasureTrend: t.optional(t.string, ""),
      TopCurrenciesToCheck: t.optional(t.string, "")
    }),
    MarketConditionsGrouping: t.model("MarketConditionGrouping", {
      Configs: t.array(t.frozen)
    }),
    VolumeGrouping: t.model("Volume", {
      Configs: t.array(t.frozen)
    }),
    ExchangeGrouping: t.model("Exchange", {
      Configs: t.array(t.frozen)
    }),
    NewCoinsGrouping: t.model("NewCoins", {
      Configs: t.array(t.frozen)
    }),
    PriceTrendChangeGrouping: t.model("PriceTrendChange", {
      Configs: t.array(t.frozen)
    }),
    VolumeTrendChangeGrouping: t.model("VolumeTrendChange", {
      Configs: t.array(t.frozen)
    }),
    LongerTermVolumeChangeGrouping: t.model("VolumeTrendChange", {
      Configs: t.array(t.frozen)
    }),
    HighLowVolumePercentageGrouping: t.model("HighLowVolumePercentage", {
      Configs: t.array(t.frozen)
    }),
    LongerTermHighLowVolumePercentageGrouping: t.model(
      "LongerTermHighLowVolumePercentage",
      {
        Configs: t.array(t.frozen)
      }
    )
  })
  .views(self => ({
    get menuItems() {
      return Object.keys(self);
    },
    get snapshot() {
      return getSnapshot(self);
    },
    getMenuData(title = "General") {
      return self[title];
    }
  }))

  .actions(self => ({
    fetch: flow(function* fetchSettings() {
      try {
        const data = yield profitTrailer.get();
        applySnapshot(self, data);
      } catch (e) {
        console.error("Failed to fetch projects", e);
      }
    }),
    addConfigGroup: section => {
      self[section]["Configs"].unshift({});
    },
    removeConfigGroup: (section: string, configIndex: number) => {
      if (section === "General") return;
      self[section]["Configs"].splice(configIndex, 1);
    },
    set: snapshot => {
      let data = {};
      if (typeof snapshot === "string") {
        try {
          data = JSON.parse(snapshot);
        } catch (e) {
          console.log("error parsing snapshot");
        }
      } else {
        data = snapshot;
      }
      applySnapshot(self, data);
    },
    save: () => {
      const output = getSnapshot(self);
      profitTrailer.save(output);
      localStorage.setItem("settings", JSON.stringify(output));
    },
    importfunc: newconfig => {
      profitTrailer.save(newconfig);
      localStorage.setItem("settings", JSON.stringify(newconfig));
    },
    updateField: (
      category: string,
      key: string,
      index: number,
      value: string = ""
    ) => {
      if (index === -1) {
        const configGroupArray: Map<string, string> = Map(self[category]);
        const result = configGroupArray.set(key, value);
        self[category] = result.toJS();
        return;
      }

      const configGroupArray: List<any> = List(self[category].Configs);
      const m = Map(configGroupArray.get(index));
      const mod = m.setIn([key], value);
      const result = configGroupArray.set(index, mod);
      self[category].Configs = result.toJS();
    }
  }));
