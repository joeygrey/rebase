import React from 'react'
import styled, { keyframes } from 'styled-components'

import CardIcon from '../CardIcon'
import farm from "../../assets/img/rebase-icon.png";

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>
      <CardIcon>
      <StyledIcon><span><img src={farm} height="42" style={{ marginTop: -4 }} /></span></StyledIcon>
      </CardIcon>
      {!!text && <StyledText>{text}</StyledText>}
    </StyledLoader>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledIcon = styled.div`
  font-size: 32px;
  position: relative;
  animation: 1s ${spin} infinite;
`

const StyledText = styled.div`
  color: ${props => props.theme.color.blue[200]};
`

export default Loader