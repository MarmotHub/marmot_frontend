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
    TestBUSDAddress: "0x54a90E6A7a49DC21467252F0E67b92157871587c",
    ParaPlaceAddress: "0x3eEd4A0Bd09A3BDC110b17be16C8C6e1E7310ADf",
    ParaOriginAddress: "0xd7f79388304A68A8B04331f874e98C686F459B30",
    AdminOriginAddress: "0x21578C95915E3d90AC84370B94A63f12C49F7e4f",
    PricingOriginAddress: "0x2C918Be13Deb9Cb50185eC98679f5B09aA243293",
    BTCBUSD: {
        PriceOracleProxyAddress: "0x68a160511Bc0eB4EDe44dE1D8d918280B7F05D82",
        ParaAddress: "0x6243C935B8BE83eFAC635b7FD9F6C3582a9d5Bf3",
        AdminAddress: "0x0E46026DC7c6B828874c019979f6a161d6858C06",
        PricingAddress: "0xf595Aa9B3e2aE326212d2A944dDD0b659820EA18",
        LpTokenAddress: "0x526206036FAD3118c0eb334B17496A2448EEF8Fc",
    },
    ETHBUSD: {
        PriceOracleProxyAddress: "0xc2d2Ee4604C6164F799308c648a2b47B74de6E36",
        ParaAddress: "0x0FE329d38fd53044D4AB02aC4D80161e4594fb8d",
        AdminAddress: "0x24885B2Fc7788E9834D3693114f1C7C39DB551c0",
        PricingAddress: "0xEC1839e3D1f56499cb8b7ac79b39f46112470647",
        LpTokenAddress: "0xf1893aDCfD70b88774ce2E6693c22cCC1E16E8F7",
    }
    }
