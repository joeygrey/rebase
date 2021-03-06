import { useCallback, useEffect, useState } from 'react'


import { Contract } from "web3-eth-contract"
import { getUnlockRate } from '../yamUtils'
import Environment from "../Environment";
import useTokenBalanceLP from './useTokenBalanceLP'
import getTotalSupply from './useTotalSupply'

import getTotalStaked from './useTotalStaked'
import { getDisplayBalance } from '../utils/formatBalance'
import {getPriceAPY, getTotalStakedValueAPY} from  '../utils/formatPrice'
import {getTotalValue} from  '../utils/formatTotalValue'

const useAPY = (poolContract: Contract, tokenContract: Contract, tokenCoinAddress: string, tokenDecimals: string) => {
    const [apy, setApy] = useState<string>("");

    //acquiring the total amount of rebase in a the uniswap liquidity pool on UniSwap. This is not the Geyser.
    const rebaseUniswapPairBalance = useTokenBalanceLP(Environment.rebase, tokenContract)

    //acquiring the total amount of usdc in a the uniswap liquidity pool on UniSwap. This is not the Geyser.
    const usdcUniswapPairBalance = useTokenBalanceLP(tokenCoinAddress, tokenContract)

    //values obtained from the rebase uniswap pool is not formatted correctly. use 9 decimails
    const rebaseUniswapPairBalanceDisplay= getDisplayBalance( rebaseUniswapPairBalance, 9)

    //values obtained from the usdc uniswap pool is not formatted correctly. use 6 decimails
    const usdcUniswapPairBalanceDisplay= getDisplayBalance( usdcUniswapPairBalance, parseInt(tokenDecimals))

    //generate the price from Uniswap.
    const rebasePriceDisplay = getPriceAPY (usdcUniswapPairBalanceDisplay,rebaseUniswapPairBalanceDisplay )

    //get the total value using the amount of rebase and usdc in the uniswap liquidity pool and times by the price
    const totalValueLP = getTotalValue( rebaseUniswapPairBalanceDisplay, usdcUniswapPairBalanceDisplay, rebasePriceDisplay)

    //get the Total Supply of Uniswap tokens
    const uniswapTotalSupply = getTotalSupply(tokenContract )

    //get the total supply of uniswap tokens in the geyser
    const geyserTotalSupply = getTotalStaked(poolContract )

    // console.log(parseInt(tokenDecimals) + " "+ usdcUniswapPairBalanceDisplay+ " "+rebasePriceDisplay+ " "+totalValueLP+ " "+uniswapTotalSupply+" "+geyserTotalSupply)
    //get the total staked value by taking the total value and multiplying by the ratio of geyser over uniwsap total
    const totalStakedValue = getTotalStakedValueAPY( totalValueLP, uniswapTotalSupply, geyserTotalSupply)

    const fetchApy = useCallback(async () => {

        console.log(totalStakedValue)
        if(rebasePriceDisplay && totalStakedValue) {
            const unlockRate = await getUnlockRate(poolContract, 5184000);
            const roi = unlockRate * parseFloat(rebasePriceDisplay) / parseFloat(totalStakedValue)
            setApy(((Math.pow(1+roi,365/60) - 1) * 100).toFixed(2));
        }


    }, [poolContract,tokenContract,totalStakedValue])

    useEffect(() => {
        if (poolContract) {
            fetchApy()
            let refreshInterval = setInterval(fetchApy, 10000)
            return () => clearInterval(refreshInterval)
        }
    }, [poolContract,totalStakedValue, setApy])

    return apy
}

export default useAPY
