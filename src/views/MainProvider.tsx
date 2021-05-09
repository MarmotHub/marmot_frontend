import React from 'react';
import {Provider} from 'react-redux';
import {UseWalletProvider} from 'use-wallet';
import ParaProvider from '../contexts/ParaProvider';
import ModalsProvider from '../contexts/Modals';
import PopupsProvider from "../contexts/Popups";
import Updater from "../state/Updaters";
import Popups from '../components/Popups';
import config from '../config';
import store from '../state';
import ReactGA from "react-ga";


const MainProvider: React.FC = ({children}) => {
  ReactGA.initialize('UA-196573876-2');
  return (
    <UseWalletProvider chainId={config.chainId}>
      <Provider store={store}>
        <Updater/>
        <ParaProvider>
          <ModalsProvider>
            <PopupsProvider>
              <Popups />
              {children}
            </PopupsProvider>
          </ModalsProvider>
        </ParaProvider>
      </Provider>
    </UseWalletProvider>
  );
};


export default MainProvider;
