import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";

import UAuth from '@uauth/js';

// ここの設定方法は
// https://docs.unstoppabledomains.com/login-with-unstoppable/login-integration-guides/login-client-configuration/
// を参照してください。
const uauth = new UAuth({
  clientID: "ce98ad31-fa95-4a01-859b-1829eb428cfb",
  redirectUri: "http://127.0.0.1",
  scope: "openid wallet"
})

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  async function unstoppableLogin() {
    try {
      const authorization = await uauth.loginWithPopup();
      console.log(authorization);
    } catch (error) {
      console.error(error);
    }
  }

  async function unstoppableLogout() {
    await uauth.logout();
    console.log('Logged out with Unstoppable');
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div>
          <Link href="https://www.blossom-a.net" passHref role="button">
            <img
              src={`/logo2.png`}
              alt="Blossom Logo"
              width={135}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        {address ? (
          <>
            <a
              className={styles.secondaryButton}
              onClick={() => disconnectWallet()}
            >
              Disconnect Wallet
            </a>
            <p style={{ marginLeft: 8, marginRight: 8, color: "grey" }}>|</p>
            <p>{address.slice(0, 6).concat("...").concat(address.slice(-4))}</p>
          </>
        ) : (
          <a
            className={styles.mainButton}
            onClick={() => connectWithMetamask()}
          >
            Connect Wallet
          </a>
        )}
        <a className={styles.mainButton} onClick={() => unstoppableLogin()} style={{marginLeft:10}}>
         Unstoppable Login
        </a>
      </div>
    </div>
  );
}
