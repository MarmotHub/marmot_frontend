import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useWallet} from 'use-wallet';
import Button from '../../Button';
import usePara from "../../../hooks/usePara";
import useHandleTransactionReceipt from "../../../hooks/useHandleTransactionReceipt";

interface TxButtonProps {}

const ClaimTestBUSDButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet();
  const para = usePara();
  const [claimed, setClaimed] = useState<boolean>(false);

  const handleTransactionReceipt = useHandleTransactionReceipt();
  const handleClaim = useCallback(
    () => {
      handleTransactionReceipt(
        para.claimTestBUSD(),
        // para._changeOracle(),
        'Claim TestBUSD',
      );
      // console.log(await para._getOracleAddress())
    }, [para]);

  // TODO
  useEffect(() => {
    async function statusClaim() {
      if (para && para.isUnlocked) {
        const status = await para.statusClaimTestBUSD()
        console.log("claim status", status)
        setClaimed(status)
      }
    }
    statusClaim()
  }, [para])


  return (
    <>
      {!!account && (
        <StyledTxButton>
          <Button
            size="sm"
            text={'Claim TestBUSD'}
            variant={'default'}
            onClick={handleClaim}
            disabled={claimed}
          />
        </StyledTxButton>
      )}
    </>
  );
};

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;
`;

export default ClaimTestBUSDButton;
