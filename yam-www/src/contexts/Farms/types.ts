import { Contract } from "web3-eth-contract"

export interface Farm {
  contract: Contract,
  name: string,
  depositToken: string,
  depositTokenAddress: string,
  tokenAddress: string,
  tokenDecimals: string,
  earnToken: string,
  earnTokenAddress: string,
  icon: React.ReactNode,
  id: string,
  sort: number,
  provider: string
}

export interface FarmsContext {
  farms: Farm[],
  unharvested: number
}