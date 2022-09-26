import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  // Connect your marketplace smart contract here (replace this address)
  const marketplace = useMarketplace(
    "0x6A54285e1daBDbc45270226674c467e7BeCBb872" // Your marketplace contract address here
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  return (
    <>
      {/* Content */}
      <div style={{ marginTop: 32, marginBottom: 32 }}>
        <Link href="https://blossom-a-lilseed-llc.vercel.app/">
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

        <p className={styles.explain}>
          ＜コントラクトをお持ちの方＞</p>

          <Link href="/create">
            <a className={styles.mainButton} style={{ textDecoration: "none" }}>
              出品はこちら
            </a>
          </Link>
        </div>

        <div style={{ marginTop: 32, marginBottom: 32 }}>

        <p className={styles.explain}>
          ＜直接アップロードしたい方＞</p>

          <Link href="https://blossom1.vercel.app/">
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
                {listings?.map((listing) => (
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
