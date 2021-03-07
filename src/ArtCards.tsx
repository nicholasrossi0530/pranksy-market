import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { IAsset } from "./interfaces/Interfaces";
import ArtCard from "./ArtCard";

function ArtCards(props: { address: string }) {
  const [assetData, setAssetData] = useState<IAsset[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.opensea.io/api/v1/assets", {
        params: {
          asset_contract_address: props.address,
          order_by: "sale_date",
          limit: 50,
        },
      });
      if (result.status === 200) {
        setAssetData(result.data.assets);
      } else {
        console.log(`ERROR: WTF ${result}`);
      }
    };

    fetchData();
  }, [props.address]);

  return (
    <>
      {assetData.map((item: IAsset) => {
        return <ArtCard address={props.address} item={item} />
      })}
    </>
  );
}

export default ArtCards;
