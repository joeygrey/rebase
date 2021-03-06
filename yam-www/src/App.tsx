import React, { useCallback, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'

import TutorialModal from './components/TutorialModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'

import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import YamProvider from './contexts/YamProvider'
import TransactionProvider from './contexts/Transactions'

import useModal from './hooks/useModal'

import Farms from './views/Farms'
import Home from './views/Home'
import Dashboard from './views/Dashboard'

import theme from './theme'
import Environment from './Environment'


const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          {/* <Route path="/farms">
            <Farms />
          </Route> */}
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          {/* <Route path="/faq">
            <FAQ />
          </Route> */}
        </Switch>
      </Router>
      <Tutorial />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={Environment.chainId}
        connectors={{
          walletconnect: { rpcUrl: Environment.rpcUrl },
        }}
      >
        <YamProvider>
          <TransactionProvider>
              <FarmsProvider>
                <ModalsProvider>
                  {children}
                </ModalsProvider>
              </FarmsProvider>
          </TransactionProvider>
        </YamProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Tutorial: React.FC = () => {

  const markSeen = useCallback(() => {
    localStorage.setItem('tutorial', 'seen')
  }, [])

  const [onPresentTutorialModal] = useModal(<TutorialModal onConfirm={markSeen} />)

  useEffect(() => {
    const seenDisclaimer = localStorage.getItem('tutorial')
    if (!seenDisclaimer) {
      onPresentTutorialModal()
    }
  }, [])

  return (
    <div />
  )
}

export default App
