import React, { useMemo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'

import Stake from './components/Stake'
import FarmStats from './components/FarmStats'
import useStakedBalance from '../../hooks/useStakedBalance'

const Farm: React.FC = () => {
  interface ParamTypes {
    farmId: string
  }
  const { farmId } = useParams<ParamTypes>()
  const {
    contract,
    depositToken,
    depositTokenAddress,
    earnToken,
    name,
    icon,
    tokenAddress,
    tokenDecimals,
  } = useFarm(farmId) || {
    depositToken: '',
    depositTokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
    tokenAddress: '',
    tokenDecimals: ''
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const { ethereum } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, depositTokenAddress)
  }, [ethereum, depositTokenAddress])

  const { onRedeem } = useRedeem(contract)

  const [trigger, setTrigger] = useState(true);
  const stakedBalance = useStakedBalance(contract, trigger)

  const triggerBalance = () => {
    setTrigger((old) => !old);
  }
  const depositTokenName = useMemo(() => {
    return depositToken.toUpperCase()
  }, [depositToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <PageHeader
        icon={icon}
        subtitle={`Deposit ${depositTokenName} and you earn ${earnTokenName}`}
        title={name}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <FarmStats
              poolContract={contract}
              tokenContract={tokenContract}
              tokenAddress={tokenAddress}
              tokenDecimals={tokenDecimals}
              stakedBalance={stakedBalance}
              triggerBalance={triggerBalance}
            />
          </StyledCardWrapper>
            <Spacer />
          <StyledCardWrapper>
            <Stake
              poolContract={contract}
              tokenContract={tokenContract}
              tokenCoinAddress={tokenAddress}
              tokenDecimals={tokenDecimals}
              tokenName={depositToken.toUpperCase()}
              stakedBalance={stakedBalance}
              triggerBalance={triggerBalance}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 98vw;
    align-items: center;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  max-width: 70vw;
  @media (max-width: 768px) {
    width: 90vw;
    align-items: flex-start;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  @media (max-width: 768px) {
    width: 50vw;
  }
`

export default Farm
