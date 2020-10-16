import React, {useCallback, useState} from 'react'
import styled from 'styled-components'

import { Contract } from 'web3-eth-contract'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'

import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import useUnstake from '../../../hooks/useUnstake'

import { getDisplayBalance } from '../../../utils/formatBalance'
import farm from "../../../assets/img/farm-icon.png";
import BigNumber from "bignumber.js";
import useStakedBalance from "../../../hooks/useStakedBalance";

interface HarvestProps {
  poolContract: Contract
}


const Harvest: React.FC<HarvestProps> = ({ poolContract }) => {

  const [trigger, setTrigger] = useState(true);
  const earnings = useEarnings(poolContract)



  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon><span><img src={farm} height="42" style={{ marginTop: -4 }} /></span></CardIcon>
            <Value value={getDisplayBalance(earnings)} />
            <Label text="reB∆SE earned" />
          </StyledCardHeader>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}


const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
