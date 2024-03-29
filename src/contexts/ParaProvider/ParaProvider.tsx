import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import Para from '../../para';
import config from '../../config';

export interface ParaContext {
  para?: Para;
}

export const Context = createContext<ParaContext>({para: undefined});

export const ParaProvider: React.FC = ({children}) => {
  const {ethereum, account, chainId, status, error, connect} = useWallet();

  const [para, setPara] = useState<Para>();


  useEffect(() => {
    const para = new Para(config);
    if (account) {
      // wallet was unlocked at initialization
      para.unlockWallet(ethereum, account, chainId);
      para.connectContract();
    }

    setPara(para);
    // console.log('account change', account);
  }, [account, chainId, status]);


  return <Context.Provider value={{para}}>{children}</Context.Provider>;
};
