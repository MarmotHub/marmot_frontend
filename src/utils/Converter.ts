import {formatUnits, parseUnits} from 'ethers/lib/utils';
import {BigNumber, ethers} from "ethers";
export const MAX_INT = ethers.constants.MaxUint256;
export const ONE = ethers.constants.WeiPerEther;

export function decimal2BN(d: string, decimal=18): BigNumber {
  return parseUnits(d, decimal);
}

export function BN2decimal(bn: BigNumber, decimal=18): string {
  return formatUnits(bn.toString(), decimal);
}

export function BN2display(bn: BigNumber, fixed:number =3, decimal=18): string {
  return Number.parseFloat(BN2decimal(bn, decimal)).toFixed(fixed);
}


export function decimalMul(a:BigNumber, b:BigNumber): BigNumber {
  return a.mul(b).div(ONE)
}

export function decimalDiv(a: BigNumber, b:BigNumber): BigNumber {
  return a.mul(ONE).div(b)
}