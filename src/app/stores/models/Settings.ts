import axios from "axios";
import { types as t, applySnapshot, flow, getSnapshot } from "mobx-state-tree";

const onReject = err => console.error(err);

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
      Configs: t.optional(
        t.array(
          t.model({
            FolderName: t.optional(t.string, ""),
            MaxTopCoinAverageChange: t.optional(t.string, ""),
            BuyValueOffset: t.optional(t.string, ""),
            SellOnlyMode: t.optional(t.string, ""),
            SellValueOffset: t.optional(t.string, ""),
            DcaTrailingBuyOffset: t.optional(t.string, ""),
            DcaTrailingProfitOffset: t.optional(t.string, "")
          })
        ),
        []
      )
    }),
    VolumeGrouping: t.model("Volume", {
      Configs: t.optional(
        t.array(
          t.model({
            MaxVolume: t.optional(t.string, ""),
            TrailingBuyOffset: t.optional(t.string, ""),
            TrailingProfitOffset: t.optional(t.string, ""),
            DcaEnabled: t.optional(t.string, "")
          })
        ),
        []
      )
    }),
    ExchangeGrouping: t.model("Exchange", {
      Configs: t.optional(
        t.array(
          t.model({
            ExchangeName: t.optional(t.string, ""),
            DcaTrailingBuyOffset: t.optional(t.string, ""),
            DcaTrailingProfitOffset: t.optional(t.string, ""),
            DcaMaxCostOffset: t.optional(t.string, ""),
            TrailingBuyOffset: t.optional(t.string, ""),
            TrailingProfitOffset: t.optional(t.string, "")
          })
        ),
        []
      )
    }),
    NewCoinsGrouping: t.model("NewCoins", {
      Configs: t.optional(
        t.array(
          t.model({
            CoinAge: t.optional(t.string, ""),
            SellOnlyMode: t.optional(t.string, "")
          })
        ),
        []
      )
    }),
    PriceTrendChangeGrouping: t.model("PriceTrendChange", {
      Configs: t.optional(
        t.array(
          t.model({
            MaxPriceTrendPercentageChange: t.optional(t.string, ""),
            SellOnlyMode: t.optional(t.string, ""),
            SellValueOffset: t.optional(t.string, "")
          })
        ),
        []
      )
    }),
    VolumeTrendChangeGrouping: t.model("VolumeTrendChange", {
      Configs: t.optional(
        t.array(
          t.model({
            MMaxVolumeTrendPercentageChange: t.optional(t.string, "")
          })
        ),
        []
      )
    }),
    LongerTermVolumeChangeGrouping: t.model("LongerTermVolumeChange", {
      Configs: t.optional(
        t.array(
          t.model({
            MaxVolumeTrendPercentageChange: t.optional(t.string, "")
          })
        ),
        []
      )
    }),
    HighLowVolumePercentageGrouping: t.model("HighLowVolumePercentage", {
      Configs: t.optional(
        t.array(
          t.model({
            MaxHighLowVolumePercentage: t.optional(t.string, "")
          })
        ),
        []
      )
    }),
    LongerTermHighLowVolumePercentageGrouping: t.model(
      "LongerTermHighLowVolumePercentage",
      {
        Configs: t.optional(
          t.array(
            t.model({
              MaxHighLowVolumePercentage: t.optional(t.string, "")
            })
          ),
          []
        )
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
    updateField: (category, key, newValue, index) => {
      if (category != "General") {
        if (index > -1) {
          self[category]["Configs"][index][key] = newValue;
        } else {
          self[category]["Configs"][key] = newValue;
        }
      } else {
        self[category][key] = newValue;
      }
      const output = getSnapshot(self);
      localStorage.setItem("settings", JSON.stringify(output));
    },
    afterCreate: () => {
      debugger;
    }
  }));
