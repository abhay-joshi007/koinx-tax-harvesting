import { Holding, CapitalGainsResponse } from '../types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchHoldings = async (): Promise<Holding[]> => {
  await delay(700);
  return [
    { coin: 'BTC', coinName: 'Bitcoin', logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png', currentPrice: 5500000, totalHolding: 0.5, averageBuyPrice: 3000000, stcg: { balance: 0.3, gain: 750000 }, ltcg: { balance: 0.2, gain: -50000 } },
    { coin: 'ETH', coinName: 'Ethereum', logo: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png', currentPrice: 216182, totalHolding: 0.000421, averageBuyPrice: 390979, stcg: { balance: 0.000421, gain: 89.41 }, ltcg: { balance: 0, gain: 0 } },
    { coin: 'SOL', coinName: 'Solana', logo: 'https://assets.coingecko.com/coins/images/4128/thumb/solana.png', currentPrice: 14758, totalHolding: 2.5, averageBuyPrice: 8000, stcg: { balance: 1.5, gain: 10137 }, ltcg: { balance: 1, gain: 6758 } },
    { coin: 'MATIC', coinName: 'Polygon', logo: 'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png', currentPrice: 22, totalHolding: 2.751455, averageBuyPrice: 0.69, stcg: { balance: 2.751455, gain: 59.24 }, ltcg: { balance: 0, gain: 0 } },
    { coin: 'USDC', coinName: 'USD Coin', logo: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png', currentPrice: 85.41, totalHolding: 0.001534, averageBuyPrice: 1.59, stcg: { balance: 0.001534, gain: 0.13 }, ltcg: { balance: 0, gain: 0 } },
    { coin: 'WPOL', coinName: 'Wrapped POL', logo: 'https://assets.coingecko.com/coins/images/32440/thumb/polygon.png', currentPrice: 22.08, totalHolding: 2.317276, averageBuyPrice: 0.52, stcg: { balance: 1.3173, gain: 49.95 }, ltcg: { balance: 1, gain: 20 } },
    { coin: 'WETH', coinName: 'Wrapped Ethereum', logo: 'https://assets.coingecko.com/coins/images/2518/thumb/weth.png', currentPrice: 211756, totalHolding: 0.00024, averageBuyPrice: 3599.86, stcg: { balance: 0.0002, gain: 49.96 }, ltcg: { balance: 0, gain: 0 } },
    { coin: 'LINK', coinName: 'Chainlink', logo: 'https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png', currentPrice: 1200, totalHolding: 10, averageBuyPrice: 1800, stcg: { balance: 5, gain: -3000 }, ltcg: { balance: 5, gain: -3000 } },
    { coin: 'UNI', coinName: 'Uniswap', logo: 'https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png', currentPrice: 900, totalHolding: 8, averageBuyPrice: 1500, stcg: { balance: 4, gain: -2400 }, ltcg: { balance: 4, gain: -2400 } },
    { coin: 'AVAX', coinName: 'Avalanche', logo: 'https://assets.coingecko.com/coins/images/12559/thumb/Avalanche_Circle_RedWhite_Trans.png', currentPrice: 2500, totalHolding: 5, averageBuyPrice: 3500, stcg: { balance: 2, gain: -2000 }, ltcg: { balance: 3, gain: -3000 } },
    { coin: 'ADA', coinName: 'Cardano', logo: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png', currentPrice: 38, totalHolding: 500, averageBuyPrice: 120, stcg: { balance: 200, gain: -16400 }, ltcg: { balance: 300, gain: -24600 } },
    { coin: 'DOT', coinName: 'Polkadot', logo: 'https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png', currentPrice: 550, totalHolding: 20, averageBuyPrice: 700, stcg: { balance: 10, gain: -1500 }, ltcg: { balance: 10, gain: -1500 } },
    { coin: 'ATOM', coinName: 'Cosmos', logo: 'https://assets.coingecko.com/coins/images/1481/thumb/cosmos_hub.png', currentPrice: 450, totalHolding: 15, averageBuyPrice: 800, stcg: { balance: 7, gain: -2450 }, ltcg: { balance: 8, gain: -2800 } },
    { coin: 'XRP', coinName: 'XRP', logo: 'https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png', currentPrice: 45, totalHolding: 1000, averageBuyPrice: 85, stcg: { balance: 500, gain: -20000 }, ltcg: { balance: 500, gain: -20000 } },
    { coin: 'DOGE', coinName: 'Dogecoin', logo: 'https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png', currentPrice: 14, totalHolding: 5000, averageBuyPrice: 25, stcg: { balance: 2500, gain: -27500 }, ltcg: { balance: 2500, gain: -27500 } },
  ];
};

export const fetchCapitalGains = async (): Promise<CapitalGainsResponse> => {
  await delay(600);
  return {
    capitalGains: {
      stcg: { profits: 70200.88, losses: 1548.53 },
      ltcg: { profits: 5020.00, losses: 3050.00 },
    },
  };
};
