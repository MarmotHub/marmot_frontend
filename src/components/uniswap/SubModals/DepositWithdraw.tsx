import React, {useCallback, useContext, useState} from 'react'
import {RowBetween} from '../Row'
import {Text} from 'rebass'
import styled from 'styled-components'
import {ArrowLeft, X} from 'react-feather'
import Column, {AutoColumn} from "../Column";
import {Separator} from "../SearchModal/styleds";
import ButtonCornered from "../../ButtonCornered";
import CurrencyInputPanel from "../CurrencyInputPanel";
import usePara from "../../../hooks/usePara";
import useAvailableMarginBalance from "../../../hooks/useAvailableMarginBalance";
import UserInfoBulletin from "./Component/UserInfoBulletin";
import PoolInfoBulletin from "./Component/PoolInfoBulletin";
import {BN2decimal, BN2display, decimal2BN} from "../../../utils/Converter";
import useHandleTransactionReceipt from "../../../hooks/useHandleTransactionReceipt";
import Spacer from "../../Spacer";
import useTestUSDTBalance from "../../../hooks/useTestUSDTBalance";
import {TYPE} from "../../../theme";
import {RowFixed} from "../../Row";
import {useHasPendingTransaction} from "../../../state/transactions/hooks";
import {Context as PopupContext} from "../../../contexts/Popups";
import {Tokens} from "../../../contexts/Popups/Popups";
import {BigNumber} from "ethers";

const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`
const PaddedColumn = styled(AutoColumn)`
  padding: 20px;
`
const HalfWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap:10px;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-item: space-between;
  gap: 50px;
  position: relative;
  padding-bottom: 50px;
  max-height: 100%;
  border-radius: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const FooterWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: ${({theme}) => theme.color.bg3};
  border-radius: 20px;
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
  
`


const ToggleWrapper = styled(RowBetween)`
  background-color: ${({theme}) => theme.color.bg3};
  border-radius: 12px;
  padding: 0px;
`

const ToggleOption = styled.div<{ active?: boolean }>`
  width: 50%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  background-color: ${({theme, active}) => (active ? theme.color.primary1 : theme.color.bg3)};
  color: ${({theme, active}) => (active ? theme.color.text1 : theme.color.text2)};
  user-select: none;
`

const SubWrapper = styled.div`
  width: 100%;
  height: 100%
  position: relative;
  padding-bottom: 60px;
`

const Section = styled(AutoColumn)`
  padding: 24px;
`

const BottomSection = styled(Section)`
  
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

export default function DepositWithdraw(
  {
    onDismiss,
    depositOpen = true
  }: {
    onDismiss: () => void
    depositOpen?: boolean
  }) {
  // toggle between tokens and lists
  const para = usePara()
  const {selectedToken} = useContext(PopupContext)
  const poolSymbol = selectedToken==Tokens.BTC? 'BUSD-BTC' : "BUSD-ETH";
  const testUSDTBalance = useTestUSDTBalance()
  const availableMarginBalance = useAvailableMarginBalance()
  const [showDeposit, setShowDeposit] = useState(depositOpen)

  const [collateralBN, setCollateralBN] = useState<BigNumber>(BigNumber.from(0))
  const [collateralVal, setCollateralVal] = useState<string>("0")
  const handleTypeInput = useCallback(
    (collateralVal: string) => {
      setCollateralVal(collateralVal)
      if (collateralVal) {
        setCollateralBN(decimal2BN(collateralVal))
      }
    },
    [collateralVal]
  )


  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleDeposit = useCallback(
    () => {
      handleTransactionReceipt(
        para.traderDeposit(collateralBN),
        `Deposit ${BN2decimal(collateralBN)} BUSD (${poolSymbol})`,
      );
    }, [para, collateralBN]);

  const handleWithdraw = useCallback(
    () => {
      handleTransactionReceipt(
        para.traderWithdraw(collateralBN),
        `Withdraw ${BN2decimal(collateralBN)} BUSD (${poolSymbol})`,
      );
    }, [para, collateralBN]);

  const handleOnMaxDeposit = useCallback(
    () => {
      setCollateralBN(testUSDTBalance);
      setCollateralVal(BN2decimal(testUSDTBalance))
    },
    [testUSDTBalance]
  )


  const handleOnMaxWithdraw = useCallback(
    () => {
      setCollateralBN(availableMarginBalance);
      setCollateralVal(BN2decimal(availableMarginBalance))
    },
    [availableMarginBalance]
  )

  const pendingTransaction = useHasPendingTransaction();


  return (
    <>
      <Wrapper>
        <FooterWrapper>
          <PaddedColumn>
            <RowBetween>
              <ArrowLeft style={{cursor: 'pointer'}} onClick={onDismiss}/>
              <Text fontWeight={500} fontSize={20}>
                Transfer Margin
              </Text>
              <CloseIcon onClick={onDismiss}/>
            </RowBetween>
          </PaddedColumn>
          <Separator/>
          <PaddedColumn>
            <ToggleWrapper>
              <ToggleOption onClick={() => setShowDeposit(!showDeposit)} active={showDeposit}>
                DEPOSIT
              </ToggleOption>
              <ToggleOption onClick={() => setShowDeposit(!showDeposit)} active={!showDeposit}>
                WITHDRAW
              </ToggleOption>
            </ToggleWrapper>
          </PaddedColumn>
          <Separator/>
          <Column style={{width: '100%', flex: '1 1'}}>
            <PaddedColumn gap="lg">
              {
                showDeposit ? (
                  <CurrencyInputPanel
                    value={collateralVal}
                    onUserInput={handleTypeInput}
                    onMax={handleOnMaxDeposit}
                    showMaxButton={true}
                    label={'Amount'}
                    headerLabel={`Wallet Balance: ${BN2display(testUSDTBalance)}`}
                    id="deposit-collateral"
                    showCurrency={true}
                    currencyName={'BUSD'}
                  />
                ) : (
                  <CurrencyInputPanel
                    value={collateralVal}
                    onUserInput={handleTypeInput}
                    onMax={handleOnMaxWithdraw}
                    showMaxButton={true}
                    label={'Amount'}
                    headerLabel={`Wallet Balance: ${BN2display(testUSDTBalance)}`}
                    id="withdraw-collateral"
                    showCurrency={true}
                    currencyName={'BUSD'}
                  />
                )
              }
              <RowFixed>
                <TYPE.black fontSize={14} fontWeight={500} color={"#C3C5CB"}>
                  {`Available Margin: ${BN2display(availableMarginBalance)}`}
                </TYPE.black>
              </RowFixed>
            </PaddedColumn>
          </Column>
          <SubWrapper>
            {showDeposit
              ? (<ButtonCornered text="DEPOSIT" variant="secondary" onClick={handleDeposit} disabled={pendingTransaction} loading={pendingTransaction}/>)
              : (<ButtonCornered text="WITHDRAW" variant="secondary" onClick={handleWithdraw} disabled={pendingTransaction} loading={pendingTransaction}/>)
            }
          </SubWrapper>
        </FooterWrapper>


        <FooterWrapper>
          <PaddedColumn>
            <BottomSection gap="12px">
              <UserInfoBulletin
              />
              <Spacer/>
              <PoolInfoBulletin
              />
            </BottomSection>
          </PaddedColumn>
        </FooterWrapper>


      </Wrapper>
    </>


  )
}
