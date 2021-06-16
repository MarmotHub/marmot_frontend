export const TestUSDTAddress = "0x74cdE0d64d8D427d24B650A0e03D3746dB6afff5";
export const ParaPlaceAddress = "0xa2EFbF917e33F14347Bf8949F04efeF23E0F9743";
export const ParaAddress = "0x72f0f0f3C8E59e8f3886fa962FC042A14EE9b589";
export const LpTokenAddress = "0x582e5fB53fde93C44d37d240E679da9d9Af255cC";
export const AdminAddress = "0x1A0a9aB0D1869Db43440Bf082Cc231AE074C0887";
export const PricingAddress = "0xcB9E2527773073be182bd60CaE9030C278162F70";
export const NaiveOracleAddress = "0xdC01DdDFaebFdfec7Fa5AF6a72C5ceA3cde79152";
export const ChainlinkBTCPriceOracleProxy = "0x3D8B4A0504E3F19e867F51AEc25C4f2AC47d6eEb";


export interface PerpetualInfo {
  ParaAddress: string
  AdminAddress: string
  PricingAddress: string
  LpTokenAddress: string
  ChainlinkPriceOracleProxy: string
}


// export const PerpetualAddress: { [key: string]: PerpetualInfo } = {
//   BTC: {
//     ParaAddress: "0x72f0f0f3C8E59e8f3886fa962FC042A14EE9b589",
//     AdminAddress: "0x1A0a9aB0D1869Db43440Bf082Cc231AE074C0887",
//     PricingAddress: "0xcB9E2527773073be182bd60CaE9030C278162F70",
//     LpTokenAddress: "0x582e5fB53fde93C44d37d240E679da9d9Af255cC",
//     ChainlinkPriceOracleProxy: "0x3D8B4A0504E3F19e867F51AEc25C4f2AC47d6eEb"
//   },
//   ETH: {
//     ParaAddress: "0x72f0f0f3C8E59e8f3886fa962FC042A14EE9b589",
//     AdminAddress: "0x1A0a9aB0D1869Db43440Bf082Cc231AE074C0887",
//     PricingAddress: "0xcB9E2527773073be182bd60CaE9030C278162F70",
//     LpTokenAddress: "0x582e5fB53fde93C44d37d240E679da9d9Af255cC",
//     ChainlinkPriceOracleProxy: "0x3D8B4A0504E3F19e867F51AEc25C4f2AC47d6eEb"
//   }
// }

export const PerpetualAddress: any = {
  development: {
    TestBUSDAddress: "0xD4f214E88dbc4A51c4DA7bA7CfF1EF9A261d522C",
    ParaPlaceAddress: "0x2C6dD3de1D8aD9ff0eA91063C01E5FDd3fE860C1",
    ParaOriginAddress: "0x3cE01a3B12D4e068bB6dfF1bEc2F7b9bA27E50F4",
    AdminOriginAddress: "0xa82e6Ce74A0A630E3AF464Cb31BF2bD2613F7B1D",
    PricingOriginAddress: "0x302B90d74651D1A1D193dF2b4383a5A76C9cf951",
    BTCBUSD: {
      PriceOracleProxyAddress: "0x69B535aDAa42c76bD6a80BfFD3CBc58a269e5052",
      ParaAddress: "0x932e244835e995255B603CDb5c0521c985f00bdb",
      AdminAddress: "0xADC1560336753015AA428Bd6B3aE131114EA0F90",
      PricingAddress: "0x8331831C837990CCb3519DBf1391d6E3306996A1",
      LpTokenAddress: "0xD0b73E5811CDD524bD6c8D49c1327fFd4592002A",
    },
    ETHBUSD: {
      PriceOracleProxyAddress: "0x69B535aDAa42c76bD6a80BfFD3CBc58a269e5052",
      ParaAddress: "0x932e244835e995255B603CDb5c0521c985f00bdb",
      AdminAddress: "0xADC1560336753015AA428Bd6B3aE131114EA0F90",
      PricingAddress: "0x8331831C837990CCb3519DBf1391d6E3306996A1",
      LpTokenAddress: "0xD0b73E5811CDD524bD6c8D49c1327fFd4592002A",
    }
  },
  bsctest: {
    TestBUSDAddress: "0x569F5b549D328D772e2d9692F27EcE85f64d41e0",
    ParaPlaceAddress: "0xe42E1b1619E0353f2b1fA21d1174Bdc03E014FF6",
    ParaOriginAddress: "0xd748c653fC767f9A6DD6Cc99E297Cf8614A106D5",
    AdminOriginAddress: "0x4aa0135c24eFfFFc02646A88C9DB392783069734",
    PricingOriginAddress: "0x97F0cB8983229cb87F47EFD6903075DB73fcE9fE",
    BTCBUSD: {
      PriceOracleProxyAddress: "0xcbEE86358D21C79472CB2B03eA270Bf1001245d5",
      ParaAddress: "0x6000Fb250b226abC88A3E513002878420bB4b7c6",
      AdminAddress: "0xB5150D39984d968d2423E251abB6860c05Ec0Bee",
      PricingAddress: "0x1cdd68D5CA33B60865a34FedCd74E0e82dB82a24",
      LpTokenAddress: "0xcf7f544D9bb6091DD0a85A5EFf1cfd8413654ca9",
    },
    ETHBUSD: {
      PriceOracleProxyAddress: "0x01e99B575f889C930394b2E4c8875b5E2bb3798B",
      ParaAddress: "0x62f43b65C681C6492525af004995e15e4D70c76C",
      AdminAddress: "0x90345cc40eec4fF1DB1104819c71E472E1896513",
      PricingAddress: "0x6eFBb63D85432dA57D5F3cbfdd8e4bd274666831",
      LpTokenAddress: "0x26E018A5A9C59Cfc8Ba2a7e0bFF337259415D01D",
    }
  }
}
