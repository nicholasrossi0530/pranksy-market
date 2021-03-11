import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAsset, IParamType } from "../interfaces/Interfaces";
import { ART_ADDRESS, getTokenIds } from "../utils/Utility";
import ArtCard from "./ArtCard";

function BoxDetail() {
    const params = useParams<IParamType>();
  
    const [assetData, setAssetData] = useState<IAsset[] | []>([]);

    const fetchData = async () => {
        const result = await axios(`https://api.opensea.io/api/v1/assets${getTokenIds(params.box)}`, {
          params: {
            asset_contract_address: ART_ADDRESS,
            order_by: "token_id",
            order_direction: "asc"
          },
        });
        if (result.status === 200) {
            setAssetData(result.data.assets);
        } else {
          console.log(`ERROR: WTF ${result}`);
        }
      };
  
    useEffect(() => {
      fetchData();
    });
  
    return (
      <>
        {assetData.map((item: IAsset) => {
          return <ArtCard address={ART_ADDRESS} item={item} />;
        })}
      </>
    )
  }

  export default BoxDetail;
