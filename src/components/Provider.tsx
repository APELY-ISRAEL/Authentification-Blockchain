"use client"
import React from 'react';
import { ThirdwebProvider, coinbaseWallet, localWallet, magicLink, metamaskWallet, safeWallet, walletConnect } from '@thirdweb-dev/react'
import { BaseGoerli, Polygon, GooddataTestnet } from "@thirdweb-dev/chains";
import { Navbar } from './ui/Navbar';




export default function Provider({ }) {
    return (
        <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      //   activeChain={activeChain}
      supportedChains={[BaseGoerli, Polygon, GooddataTestnet]}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        safeWallet(),
        magicLink({
          apiKey:"",
        }),
        localWallet(),
       
      ]}
    >
      <Navbar/> 
    </ThirdwebProvider>
    );
};