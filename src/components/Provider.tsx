"use client"
import React from 'react';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';
import { Navbar } from './ui/Navbar';
import { ethers } from "ethers";
import abi from "@/lib/utils/abi.json";

interface ContextType {
  contract: ethers.Contract | null
  provider: ethers.providers.Web3Provider| null
  signer: ethers.providers.JsonRpcSigner| null
  getAccount?: () => void | null
}
export const StateContext = React.createContext<ContextType>({
  contract:null,
  provider:null,
  signer:null,
  // getAccount:null
});

export function StateContextProvider({ children }: { children: React.ReactNode }) {
  const [contract, setContract] = React.useState<ethers.Contract | null>(null)
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider | null>(null)
  const [signer, setSigner] = React.useState<ethers.providers.JsonRpcSigner | null >(null)

  async function getAccount() {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err: { code: number; }) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    console.log("connected account",account);
  }

  React.useEffect(() => {
    console.log("Use effect from Provider")
    getAccount()
    const newProvider = new ethers.providers.Web3Provider(window.ethereum, )

    const newSigner = newProvider?.getSigner()
    setSigner(newSigner)
    setProvider(newProvider)

    const verifierContract = new ethers.Contract("0x30a14e44d6e1d59909222c4185126b5bf7bc70f9", abi, newSigner)
    setContract(verifierContract)
    // }
    // verifierContract.baseURI()
  }, [])
  

  return (
    <StateContext.Provider value={
      {
        contract,
        provider,
        signer,
        // getAccount
      }
    }>
{children}

    </StateContext.Provider>
  )
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      clientId="bbede97e901ee491f7c650d66c3b64b2n"
      // activeChain="sepolia"
      // supportedChains={[Sepolia]}
      supportedWallets={[
        metamaskWallet(),
      ]}
    >
      {/* <Navbar /> */}
      <StateContextProvider>
      {children}
      </StateContextProvider>
      
    </ThirdwebProvider>
  );
};