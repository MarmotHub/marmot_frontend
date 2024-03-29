import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import {useWallet} from 'use-wallet';
import Page from '../../components/Page';
import Spacer from '../../components/Spacer';
import Button from "../../components/Button";
import {ButtonDropdownLight} from "../../components/uniswap/ButtonDropdown";
import Row from "../../components/uniswap/Row";
import {Text} from 'rebass'
import CurrencyLogo from "../../components/uniswap/CurrencyLogo";
import SelectContract from "../../components/uniswap/SubModals/SelectContract";
import BuySell from "../../components/uniswap/SubModals/BuySell";
import DepositWithdraw from "../../components/uniswap/SubModals/DepositWithdraw";
import Modal from "../../components/uniswap/Modal";
import usePara from "../../hooks/usePara";
import useApprove, {ApprovalState} from "../../hooks/useApprove";
import {ParaAddress} from "../../deployment/const";
import PricePanel from "./component/PricePanel";
import {Context as PopupContext} from "../../contexts/Popups"
import {Tokens} from "../../contexts/Popups/Popups";


const Trade: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const handleSearchDismiss = useCallback(() => {
    setShowSearch(false)
  }, [setShowSearch])

  const {account, connect, chainId} = useWallet()
  const para = usePara()
  const {selectedToken} = useContext(PopupContext)
  const poolString = selectedToken==Tokens.BTC? "BTC/BUSD" : "ETH/BUSD"

  const [mainShow, setMainShow] = useState<boolean>(true);
  const [depositOpen, setDepositOpen] = useState<boolean>(false);
  const [withdrawOpen, setWithdrawOpen] = useState<boolean>(false);
  const [buyOpen, setBuyOpen] = useState<boolean>(false);
  const [sellOpen, setSellOpen] = useState<boolean>(false);

  const buyClick = useMemo(() => {
      if (para && para.isUnlocked) {
        return true
      }
      return false
    },
    [para]
  )


  const handleDismissBuySell = useCallback(
    () => {
      buyOpen ? setBuyOpen(false) : setSellOpen(false);
      setMainShow(true)
    },
    [buyOpen, sellOpen]
  );

  const handleDismissDepositWithdraw = useCallback(
    () => {
      depositOpen ? setDepositOpen(false) : setWithdrawOpen(false);
      setMainShow(true);
    },
    [depositOpen, withdrawOpen]
  );

  useEffect(() => {
    handleDismissDepositWithdraw()
    handleDismissBuySell()
  }, [account, chainId]);

  useEffect(() => {
    ReactGA.pageview('/Trade');
    if (!account || !para) {
      connect('injected');
    }
  }, []);


  const ApproveSector: React.FC = () => {
    const [approveStatus, approve] = useApprove(para?.TestUSDT, para.contracts["ParaInstance"].address);

    return (
      <>
        {
          approveStatus !== ApprovalState.APPROVED ? (
            <StyledModalAction>
              <Button
                onClick={approve}
                size="lg"
                text="Approve TestBUSD"
                variant="secondary"
                disabled={approveStatus === ApprovalState.PENDING}
              />
            </StyledModalAction>
          ) : (
            <Wrapper>
              <StyledModalAction>
                <Button
                  size="lg"
                  text="DEPOSIT"
                  onClick={() => {
                    setDepositOpen(true)
                    setMainShow(false)
                  }}
                  variant="default"
                />
              </StyledModalAction>
              <StyledModalAction>
                <Button
                  size="lg"
                  text="WITHDRAW"
                  onClick={() => {
                    setWithdrawOpen(true)
                    setMainShow(false)
                  }}
                  variant="tertiary"
                />
              </StyledModalAction>
            </Wrapper>
          )
        }
      </>
    )
  }


  const DepositModal: React.FC = () => {
    return (
      <>
        {!account || !para ? (
          <StyledModalAction>
            <Button
              onClick={() => {
                connect('injected')
              }}
              size="lg"
              text="Unlock Wallet"
              variant="secondary"
            />
          </StyledModalAction>
        ) : (<ApproveSector/>)
        }
      </>
    )
  }


  return (
    <>
      <Page>
        {mainShow && <StyledCard>
            <ButtonDropdownLight
                onClick={() => {
                  setShowSearch(true)
                }}
            >
                <Row>
                    <CurrencyLogo name={selectedToken==Tokens.BTC? "BTC": "ETH"}/>
                    <Text fontWeight={500} fontSize={20} marginLeft={'12px'}>
                      {poolString}
                    </Text>
                </Row>
            </ButtonDropdownLight>
            <Spacer size="md"/>
            <Wrapper>
                <StyledModalAction>
                    <Button text="BUY/LONG" variant="secondary" onClick={() => {
                      setBuyOpen(true);
                      setMainShow(false);
                    }} disabled={!buyClick}/>
                </StyledModalAction>
                <StyledSpacer/>
                <StyledModalAction>
                    <Button text="SELL/SHORT" variant="secondary" onClick={() => {
                      setSellOpen(true);
                      setMainShow(false);
                    }} disabled={!buyClick}/>
                </StyledModalAction>
            </Wrapper>
            <Spacer size="md"/>

          {/*<Wrapper>*/}
          {/*<TokenInput max={1000} symbol={"USDT"} onChange={() => {}} value={"10000"} />*/}
          {/*</Wrapper>*/}

            <Wrapper>
                <PricePanel showHeaderLabel={false} id={'Main-Price'} showCurrency={false} currencyName={'ETHER'}/>
            </Wrapper>

            <Spacer size="md"/>
            <Wrapper>
                <DepositModal/>
            </Wrapper>
        </StyledCard>
        }


        <Modal isOpen={showSearch} onDismiss={handleSearchDismiss} maxHeight={80} minHeight={50} singleCol={true}>
          <SelectContract
            onDismiss={handleSearchDismiss}
          />
        </Modal>

        <Modal isOpen={buyOpen || sellOpen} onDismiss={() => {
        }} maxHeight={80} minHeight={50}>
          <BuySell
            onDismiss={handleDismissBuySell}
            buyOpen={buyOpen}
          />
        </Modal>

        <Modal isOpen={depositOpen || withdrawOpen} onDismiss={() => {
        }} maxHeight={80} minHeight={50}>
          <DepositWithdraw
            onDismiss={handleDismissDepositWithdraw}
            depositOpen={depositOpen}
          />
        </Modal>

      </Page>

    </>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;


const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[6]}px;
`;

const StyledModalAction = styled.div`
  flex: 1;
`

const StyledCard = styled.div`
  width: 420px;
  background-color: ${({theme}) => theme.color.bg1};
  border: 1px solid ${(props) => props.theme.color.grey[900]};
  box-sizing: border-box;
  padding: 36px;
  border-radius: 48px;

  display: flex;
  align-items: center;
  flex-direction: column;
`;


export default Trade;
