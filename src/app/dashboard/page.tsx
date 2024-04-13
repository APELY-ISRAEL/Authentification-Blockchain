"use client";
import { Card } from "@/components/cards";

import { ethers } from "ethers";
import React from "react";
import abi from "@/lib/utils/abi.json";

export default function Page() {
  const [contract, setContract] = React.useState<ethers.Contract | null>(null)
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider | null>(null)
  const [signer, setSigner] = React.useState<ethers.providers.JsonRpcSigner | null | undefined>(null)


  async function getAccount() {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err: { code: number; }) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    console.log(account);
  }
  React.useEffect(() => {
    getAccount()
    const newProvider = new ethers.providers.Web3Provider(window.ethereum, "any")

    const newSigner = newProvider?.getSigner()
    setSigner(newSigner)
    setProvider(newProvider)

    const verifierContract = new ethers.Contract("0x3880c8e964f350c2b8baa5b916d0516380fa1489", abi, newSigner)
      setContract(verifierContract)
  }, [])

  async function getUri() {
    console.log(contract)
    const uri = await contract?.grantVerifierRole("0x8298F4605f9893F80966826B8a301c963d0FC514")
    console.log(uri)
  }
 

  return (
    <main className="">
      <button onClick={() => getUri()}>Make call</button>
    </main>
  );
}