import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IAsset, IParamType } from "../interfaces/Interfaces";
import { ART_ADDRESS, getTokenIds } from "../utils/Utility";
import ArtCard from "./ArtCard";
import LoadingCard from "./LoadingCard";

function BoxDetail() {
  const params = useParams<IParamType>();
  const [assetData, setAssetData] = useState<IAsset[] | []>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (box: string) => {
    const result = await axios(
      `https://api.opensea.io/api/v1/assets${getTokenIds(box)}`,
      {
        params: {
          asset_contract_address: ART_ADDRESS,
          order_by: "token_id",
          order_direction: "asc",
        },
      }
    );
    if (result.status === 200) {
      setAssetData(result.data.assets);
      setLoading(false);
    } else {
      console.log(`ERROR: WTF ${result}`);
    }
  };

  useEffect(() => {
    fetchData(params.box);
  }, [params.box]);

  if (loading) {
    return (
      <>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </>
    );
  } else {
    return (
      <>
        {assetData.map((item: IAsset) => {
          return <ArtCard key={item.id} address={ART_ADDRESS} item={item} />;
        })}
      </>
    );
  }
}

export default BoxDetail;
