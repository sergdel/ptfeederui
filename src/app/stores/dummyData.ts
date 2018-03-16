export default {
  General: {
    BaseCurrency: "BTC",
    ABuyStrategy: "LOWBB",
    ABuyValue: "15",
    MaxCost: "0.003",
    MaxBuySpread: "1",
    TrailingBuy: "0.3",
    TrailingProfit: "0.3",
    MinBuyBalance: "50",
    MinBuyPrice: "0.00005",
    MinBuyVolume: "500",
    MaxTradingPairs: "15",
    SellStrategy: "GAIN",
    SellValue: "0.75",
    DcaEnabled: "-3",
    HiddenCoins: "BNB",

    DcaMaxBuySpread: "1",
    DcaMaxBuyTimes: "5",
    DcaMaxCost: "0.1",
    DcaMinBuyBalance: "20",
    DcaSellStrategy: "GAIN",
    DcaSellValue: "0.75",
    DcaTrailingBuy: "0.15",
    DcaTrailingProfit: "0.15",

    ExcludedCoins: "BNB",
    SomOnlyCoins:
      "MTL,DGD,TRIG,MTL,SWIFT,ARDR,SAFEX,BTA,DAR,DRACO,SLING,CRYPT,DOGE,UNO,SC,INCNT,NAUT,SJCX,NOTE,TKN,TIME",
    MinutesForLongerTermTrend: "720",
    MinutesToMeasureTrend: "60",
    TopCurrenciesToCheck: "35"
  },
  MarketConditionsGrouping: {
    Configs: [
      {
        FolderName: "01-bear",
        MaxTopCoinAverageChange: "-1.5",
        BuyValueOffset: "-30",
        SellOnlyMode: "true",
        SellValueOffset: "-20",
        DcaTrailingBuyOffset: "10",
        DcaTrailingProfitOffset: "-20",
        Override: {
          MaxTradingPairs: "20",
          DcaMaxCost: "0.1",
          DcaMinBuyBalance: "20",
          DcaSellStrategy: "GAIN",
          DcaSellValue: "0.75"
        }
      },
      {
        FolderName: "02-boring",
        MaxTopCoinAverageChange: "2",
        DcaTrailingBuyOffset: "10",
        DcaTrailingProfitOffset: "-20",
        Override: {
          MaxTradingPairs: "20"
        }
      },
      {
        FolderName: "03-bull",
        MaxTopCoinAverageChange: "1000",
        BuyValueOffset: "2",
        DcaTrailingBuyOffset: "10",
        DcaTrailingProfitOffset: "-20"
      }
    ]
  },
  VolumeGrouping: {
    Configs: [
      {
        MaxVolume: "500",
        TrailingBuyOffset: "10",
        TrailingProfitOffset: "-20",
        DcaEnabled: "-20"
      }
    ]
  },
  ExchangeGrouping: {
    Configs: [
      {
        ExchangeName: "Binance",
        DcaTrailingBuyOffset: "10",
        DcaTrailingProfitOffset: "-20",
        DcaMaxCostOffset: "50",
        TrailingBuyOffset: "10",
        TrailingProfitOffset: "-20",
        MinBuyVolumeOffset: "-50"
      },
      {
        ExchangeName: "Bittrex",
        DcaTrailingBuyOffset: "15",
        DcaTrailingProfitOffset: "-25",
        DcaMaxCostOffset: "55",
        TrailingBuyOffset: "15",
        TrailingProfitOffset: "-25"
      },
      {
        ExchangeName: "Poloniex",
        DcaTrailingBuyOffset: "20",
        DcaTrailingProfitOffset: "-30",
        DcaMaxCostOffset: "60",
        TrailingBuyOffset: "20",
        TrailingProfitOffset: "-30",
        Override: {
          ASellStrategy: "HIGHBB"
        }
      }
    ]
  },
  NewCoinsGrouping: {
    Configs: [
      {
        CoinAge: "3",
        TimeUnit: "Days",
        SellOnlyMode: "true"
      }
    ]
  },
  PriceTrendChangeGrouping: {
    Configs: [
      {
        MaxPriceTrendPercentageChange: "-5",
        SellOnlyMode: "true",
        SellValueOffset: "-20"
      },
      {
        MaxPriceTrendPercentageChange: "0.5",
        SellOnlyMode: "-70",
        SellValueOffset: "5"
      }
    ]
  },
  VolumeTrendChangeGrouping: {
    Configs: [
      {
        MaxVolumeTrendPercentageChange: "-5"
      },
      {
        MaxVolumeTrendPercentageChange: "5"
      }
    ]
  },
  LongerTermVolumeChangeGrouping: {
    Configs: [
      {
        MaxVolumeTrendPercentageChange: "-5"
      },
      {
        MaxVolumeTrendPercentageChange: "5"
      }
    ]
  },
  HighLowVolumePercentageGrouping: {
    Configs: [
      {
        MaxHighLowVolumePercentage: "-5"
      },
      {
        MaxHighLowVolumePercentage: "5"
      }
    ]
  },
  LongerTermHighLowVolumePercentageGrouping: {
    Configs: [
      {
        MaxHighLowVolumePercentage: "-5"
      },
      {
        MaxHighLowVolumePercentage: "5"
      }
    ]
  }
};
