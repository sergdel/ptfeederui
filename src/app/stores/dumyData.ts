export default {
  General: {
    BaseCurrency: '----',
    BuyStrategy: '----',
    BuyValue: '----',
    MaxCost: '----',
    MaxBuySpread: '----',
    TrailingBuy: '----',
    TrailingProfit: '----',
    MinBuyBalance: '----',
    MinBuyPrice: '----',
    MinBuyVolume: '----',
    MaxTradingPairs: '----',
    SellStrategy: '----',
    SellValue: '----',
    DcaEnabled: '----',
    HiddenCoins: '----',
    DcaMaxBuySpread: '----',
    DcaMaxBuyTimes: '----',
    DcaMaxCost: '----',
    DcaMinBuyBalance: '----',
    DcaSellStrategy: '----',
    DcaSellValue: '----',
    DcaTrailingBuy: '----',
    DcaTrailingProfit: '----',
    ExcludedCoins: '----',
    SomOnlyCoins:
      '----',
    MinutesForLongerTermTrend: '----',
    MinutesToMeasureTrend: '----',
    TopCurrenciesToCheck: '----'
  },
  MarketConditions: {
    Configs: [
      {
        FolderName: '----',
        MaxTopCoinAverageChange: '----',
        BuyValueOffset: '----',
        SellOnlyMode: '----',
        SellValueOffset: '----',
        DcaTrailingBuyOffset: '----',
        DcaTrailingProfitOffset: '----'
      },
      {
        FolderName: '----',
        MaxTopCoinAverageChange: '----',
        DcaTrailingBuyOffset: '----',
        DcaTrailingProfitOffset: '----'
      },
      {
        FolderName: '----',
        MaxTopCoinAverageChange: '----',
        BuyValueOffset: '----',
        DcaTrailingBuyOffset: '----',
        DcaTrailingProfitOffset: '----'
      }
    ]
  },
  Volume: {
    Configs: [
      {
        MaxVolume: '----',
        TrailingBuyOffset: '----',
        TrailingProfitOffset: '----',
        DcaEnabled: '----'
      }
    ]
  },
  Exchange: {
    Configs: [
      {
        ExchangeName: '----',
        DcaTrailingBuyOffset: '----',
        DcaTrailingProfitOffset: '----',
        DcaMaxCostOffset: '----',
        TrailingBuyOffset: '----',
        TrailingProfitOffset: '----'
      },
      {
        ExchangeName: '----',
        DcaTrailingBuyOffset: '----',
        DcaTrailingProfitOffset: '----',
        DcaMaxCostOffset: '----',
        TrailingBuyOffset: '----',
        TrailingProfitOffset: '----'
      },
      {
        ExchangeName: '----',
        DcaTrailingBuyOffset: '----',
        DcaTrailingProfitOffset: '----',
        DcaMaxCostOffset: '----',
        TrailingBuyOffset: '----',
        TrailingProfitOffset: '----'
      }
    ]
  },
  NewCoins: {
    Configs: [
      {
        CoinAge: '----',
        SellOnlyMode: '----'
      }
    ]
  },
  PriceTrendChange: {
    Configs: [
      {
        MaxPriceTrendPercentageChange: '----',
        SellOnlyMode: '----',
        SellValueOffset: '----'
      },
      {
        MaxPriceTrendPercentageChange: '----',
        TrailingBuyOffset: '----',
        TrailingProfitOffset: '----'
      }
    ]
  }
};