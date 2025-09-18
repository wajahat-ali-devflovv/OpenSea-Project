import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNftsRequest } from "../store/actions/nftsActions";
import type { RootState } from "../store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import slideImage1 from "../assets/images/slider1.jpg";
import slideImage2 from "../assets/images/slider2.png";
import slideImage3 from "../assets/images/slider3.jpeg";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";

function NFTList() {
  const { collectionId } = useParams(); // 👈 from /collections/:collectionId/nfts
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.nfts
  );

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchNftsRequest(collectionId));
    }
  }, [dispatch, collectionId]);

  if (loading) return <p>Loading NFTs...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No NFTs found in this collection.</p>;
  }

  return (
    <div>
      <nav className=" flex w-[97%] h-[65px] sticky right-0 align-center py-[10px]  ">
        <div className="header w-[98%] flex flex-row justify-between    text-[14px]  ml-[40px] ">
          <div className=" flex flex-row    text-[14px] gap-[15px] fixed right-5  ">
            <>
              <Button>
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Button>{" "}
            </>

            {/* correct icon alignment*/}
          </div>
        </div>
      </nav>
      <div>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 8000 }}
          loop={true}
          className="custom-swiper opacity-80"
        >
          <SwiperSlide>
            <img src={slideImage1} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {items.map((nft: any) => (
          <div
            key={nft.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "220px",
              backgroundColor: "#ffffff",
            }}
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
    </div>
  );
}

export default NFTList;
