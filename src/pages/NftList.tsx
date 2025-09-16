import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNftsRequest } from "../store/actions/nftsActions";
import type { RootState } from "../store/store";

function NFTList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.nfts
  );

  useEffect(() => {
    dispatch(fetchNftsRequest());
  }, [dispatch]);

  if (loading) return <p>Loading NFTs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {items.map((nft: any) => (
        <div
          key={nft.id}
          style={{ border: "1px solid #ccc", padding: "10px", width: "220px" }}
        >
          <h3>{nft.name}</h3>
          <img src={nft.image_url} alt={nft.name} width="200" />
          <p>{nft.description}</p>
          <p>
            <b>Price:</b> {nft.price} ETH
          </p>
          <p>
            <b>Status:</b> {nft.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NFTList;
