import {Configuration} from './para/config';

enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,
    GANACHE = 1337
}

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 1337,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'http://localhost:7545',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  mainnet: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://mainnet.infura.io/v3/c674b8938c9f424d8c12532ab8b811e5',
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  kovan: {
    chainId: ChainId.KOVAN,
    etherscanUrl: 'https://kovan.etherscan.io',
    defaultProvider: 'https://kovan.infura.io/v3/c674b8938c9f424d8c12532ab8b811e5',
    refreshInterval: 5000,
    gasLimitMultiplier: 1.1,
  },
  bsc: {
    chainId: 56,
    etherscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    refreshInterval: 5000,
    gasLimitMultiplier: 1.1,
  },
  bsctest: {
    chainId: 97,
    etherscanUrl: 'https://testnet.bscscan.com/',
    defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    refreshInterval: 5000,
    gasLimitMultiplier: 1.1,
  }
};


export default configurations["bsctest"];
