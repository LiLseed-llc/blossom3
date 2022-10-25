import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";

const Home: NextPage = () => {
  const router = useRouter();

  const [nftList, setNftList] = useState<any[]>([]);

  // Connect your marketplace smart contract here (replace this address)
  const marketplace = useMarketplace(
    "0x9c8c54B0D33aF31E820673A190C0FB0C69baF1db" // Your marketplace contract address here
  );

  const { data: listings, isLoading: loadingListings } = useActiveListings(marketplace);

  useEffect(() => {
    var tempList: any[] = [];
    listings?.map((listing) => {
      tempList.push(listing);
    })
    let tempNftList: any[] = [];
    var nftCount:number = tempList.length;
    for(let i = 0; i < nftCount; i ++) {
      const randomIndex = getRandomInt(tempList.length);
      tempNftList.push(tempList[randomIndex]);
      tempList = tempList.splice(randomIndex, 1);
    }
    setNftList(tempNftList);
  },[listings])

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      {/* Content */}
      <div style={{ marginTop: 32, marginBottom: 32 }}>
        <Link href="https://blossom3.vercel.app/">
          <a
            className={styles.mainButton} style={{ textDecoration: "none" }}>
            MarketPlace TOP
          </a>
        </Link>
      </div>
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>Blossom＊ MarketPlace</h1>

        <hr className={styles.divider} />

        <p className={styles.explain}>
          Blossom＊のMarketPlaceへようこそ</p>
        <p className={styles.explain}>
          ー新しいものを作り上げる体験をしようー</p>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>

          <Link href="/create">
            <a className={styles.mainButton} style={{ textDecoration: "none" }}>
              出品はこちら
            </a>
          </Link>
        </div>

        <hr className={styles.divider} />

        <p></p>

        <div className="main">
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>作品を表示中です...少々お待ちください</div>
            ) : (
              // Otherwise, show the listings
              <div className={styles.listingGrid}>
                {nftList?.map((listing:(AuctionListing | DirectListing)) => (
                  <div
                    key={listing.id}
                    className={styles.listingShortView}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <MediaRenderer
                      src={listing.asset.image}
                      style={{
                        borderRadius: 16,
                        // Fit the image to the container
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <h2 className={styles.nameContainer}>
                      <Link href={`/listing/${listing.id}`}>
                        <a className={styles.name}>{listing.asset.name}</a>
                      </Link>
                    </h2>

                    <p>
                      <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
