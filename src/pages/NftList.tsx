import React, { useEffect, useState } from "react";

function NFTList() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/nfts")
      .then((res) => res.json())
      .then((data) => setNfts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {nfts.map((nft: any) => (
        <div key={nft.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
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
