import React, {useCallback, useContext, useEffect, useState} from 'react'
import {RowBetween, RowFixed} from '../Row'
import {Text} from 'rebass'
import styled from 'styled-components'
import {ArrowLeft, X} from 'react-feather'
import Column, {AutoColumn} from "../Column";
import {Separator} from "../SearchModal/styleds";
import ButtonCornered from "../../ButtonCornered";
import CurrencyInputPanel from "../CurrencyInputPanel";
import usePara from "../../../hooks/usePara";
import useTestUSDTBalance from "../../../hooks/useTestUSDTBalance";
import {BN2decimal, BN2display, decimal2BN} from "../../../utils/Converter";
import useLpTokenBalance from "../../../hooks/useLpTokenBalance";
import {TYPE} from "../../../theme";
import useHandleTransactionReceipt from "../../../hooks/useHandleTransactionReceipt";
import {Context as PopupContext} from "../../../contexts/Popups";
import {Tokens} from "../../../contexts/Popups/Popups";
import config from "../../../config";
import {useHasPendingTransaction} from "../../../state/transactions/hooks";
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


export default function LiquidityAddRemove(
  {
    onDismiss,
    addOpen = true
  }: {
    onDismiss: () => void
    addOpen?: boolean
  }) {
  // toggle between tokens and lists
  const {selectedToken} = useContext(PopupContext)
  const poolSymbol = selectedToken==Tokens.BTC? 'BUSD-BTC' : "BUSD-ETH";
  const [showLists, setShowLists] = useState(addOpen)

  const para = usePara()
  const lpTokenBalance = useLpTokenBalance()
  // const lpTokenTotalSupply = useLpTokenTotalSupply()
  const [collateralBN, setCollateralBN] = useState<BigNumber>(BigNumber.from(0))
  const [collateralVal, setCollateralVal] = useState<string>("0")
  const [availableMarginBN, setAvailableMarginBN] = useState<BigNumber>(BigNumber.from(0))





  useEffect(() => {
    if (para && para.isUnlocked) {
      updateOnchain().catch(err => console.error(err.stack));
      const refreshBalance = setInterval(updateOnchain, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [para]);

  const updateOnchain = useCallback(async () => {
      setAvailableMarginBN(await para.availableMargin())
    },
    []
  );

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
  const handleAdd = useCallback(
    () => {
      handleTransactionReceipt(
        para.lpAdd(collateralBN),
        `Add ${BN2decimal(collateralBN)} BUSD to pool ${poolSymbol}`,
      );
    }, [para, collateralBN]);

  const handleRemove = useCallback(
    () => {
      handleTransactionReceipt(
        para.lpRemove(collateralBN),
        `Remove ${BN2decimal(collateralBN)} LP Token from pool ${poolSymbol}`,
      );
    }, [para, collateralBN]);


  const handleOnAddMax = useCallback(
    () => {
      setCollateralBN(availableMarginBN);
      setCollateralVal(BN2decimal(availableMarginBN));
    },
    [availableMarginBN]
  )

  const handleOnRemoveMax = useCallback(
    () => {
      setCollateralBN(lpTokenBalance);
      setCollateralVal(BN2decimal(lpTokenBalance));
    },
    [lpTokenBalance]
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
                LP TRANSFER
              </Text>
              <CloseIcon onClick={onDismiss}/>
            </RowBetween>
          </PaddedColumn>
          <Separator/>
          <PaddedColumn>
            <ToggleWrapper>
              <ToggleOption onClick={() => setShowLists(!showLists)} active={showLists}>
                ADD LP
              </ToggleOption>
              <ToggleOption onClick={() => setShowLists(!showLists)} active={!showLists}>
                REMOVE LP
              </ToggleOption>
            </ToggleWrapper>
          </PaddedColumn>
          <Separator/>
          <Column style={{width: '100%', flex: '1 1'}}>
            <PaddedColumn gap="lg">
              {showLists
              ? ( <CurrencyInputPanel
                value={collateralVal}
                onUserInput={handleTypeInput}
                onMax={handleOnAddMax}
                showMaxButton={true}
                label={'Amount'}
                headerLabel={`Available Margin: ${BN2display(availableMarginBN)} BUSD`}
                id="addlp"
                showCurrency={true}
                currencyName={'BUSD'}
              />)
              : ( <CurrencyInputPanel
                value={collateralVal}
                onUserInput={handleTypeInput}
                onMax={handleOnRemoveMax}
                showMaxButton={true}
                label={'Amount'}
                headerLabel={`Available Margin: ${BN2display(availableMarginBN)} BUSD`}
                id="removelp"
                showCurrency={true}
                currencyName={poolSymbol}
              />)
            }
              <RowFixed>
                <TYPE.black fontSize={14} fontWeight={500} color={"#C3C5CB"}>
                  {`LP Balance: ${BN2display(lpTokenBalance)}`}
                </TYPE.black>
              </RowFixed>
            </PaddedColumn>
          </Column>
          <SubWrapper>
            {showLists
              ? (<ButtonCornered text="ADD" variant="secondary" onClick={handleAdd} disabled={pendingTransaction || availableMarginBN.lte(0)}
              loading={pendingTransaction}/>)
              : (<ButtonCornered text="REMOVE" variant="secondary" onClick={handleRemove} disabled={pendingTransaction || lpTokenBalance.lte(0)}
              loading={pendingTransaction}/>)
            }
          </SubWrapper>
        </FooterWrapper>

      </Wrapper>
    </>


  )
}
