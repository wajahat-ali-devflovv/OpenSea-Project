import React, { useState, useEffect } from "react";
import Button1 from "../components/Button";
import InputField from "../components/InputField";
import userIcon from "../assets/icons/icons8-user-16.png";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import ButtonComp from "../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import slideImage1 from "../assets/images/slider1.jpg";
import slideImage2 from "../assets/images/slider2.png";
import slideImage3 from "../assets/images/slider3.jpeg";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionsRequest } from "../store/actions/collectionsActions";
import { logoutSuccess } from "../store/actions/authActions";
import type { RootState } from "../store/store";

// import modules

const categories = ["gaming", "art", "pfps", "more"];
const icons = ["🔥", "🎨", "🎮", "💎", "⚡", "🛠️"];
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSlideClick = (collectionName: string) => {
    navigate(`/nfts/${collectionName}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutSuccess()); // Clear Redux state
    navigate("/login");
  };

  const dispatch = useDispatch();

  const {
    items: collections,
    loading,
    error,
  } = useSelector((state: RootState) => state.collections);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCollectionsRequest());
    console.log(user);
  }, [dispatch]);

  if (loading) return <p className="text-white">Loading collections...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <div className="flex flex-col w-[100%] h-screen flex text-white  bg-[#101011]">
      <nav className=" flex w-[97%] h-[65px] sticky right-0 align-center py-[10px]  ">
        <div className="header w-[98%] flex flex-row justify-between    text-[14px]  ml-[40px] ">
          <div className=" w-[60%] h-[45px] flex flex-row    ">
            <input
              className={`border-1 border-black bg-[#050505] rounded-md font-[600] pl-1 w-[40%]  shadow-sm shadow-white`}
              placeholder="Search OpenSea"
            />
          </div>
          <div className=" flex flex-row    text-[14px] gap-[15px]   ">
            {user ? (
              <>
                <span>Welcome, {user.username}</span>
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="inherit"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outlined"
                  color="inherit"
                >
                  Login
                </Button>
                <Button>
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Button>{" "}
              </>
            )}
            {/* correct icon alignment*/}
          </div>
        </div>
      </nav>
      <div className="w-[92%] h-[50px] flex flex-row items-center justify-between gap-[20px] ml-[40px]">
        <div className="gap-[10px] flex flex-row">
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            All
          </Button>
          <div style={{ display: "flex", gap: "10px" }}>
            {categories.map((cat) => (
              <Button
                key={cat}
                size="small"
                variant="outlined"
                sx={{
                  color: "#ACADAE",
                  borderColor: "gray",
                  backgroundColor: "#101011",
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
                {/*
                onClick={() => navigate(`/category/${cat}`)}*/}
              </Button>
            ))}
          </div>
        </div>
        <div className="gap-[7px] flex flex-row">
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            All
          </Button>
          <div style={{ display: "flex", gap: "10px" }}>
            {icons.map((icon: any) => (
              <Button
                key={icon}
                size="small"
                variant="outlined"
                sx={{
                  color: "#ACADAE",
                  borderColor: "gray",
                  backgroundColor: "#101011",
                }}
              >
                {icon}{" "}
                {/*
                onClick={() => navigate(`/category/${cat}`)}*/}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          loop={true}
          className="custom-swiper"
        >
          <SwiperSlide>
            <img src={slideImage1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slideImage2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slideImage3} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slideImage2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slideImage1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slideImage3} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div>
        <h1 className="text-[25px] font-[600] ml-[40px]">
          Featured Collections
        </h1>
        <span className="text-[14px] font-[500] ml-[40px] text-[#8a8b8d]">
          This week's curated collections
        </span>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="nft-slider custom-swiper"
        >
          {collections.map(
            (collection) => (
              console.log(JSON.stringify(collection.path)),
              (
                <SwiperSlide
                  key={collection.id}
                  onClick={() =>
                    navigate(`/nfts/collections/${collection.id}/nfts`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={collection.image_path || slideImage1}
                    alt={collection.name}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                  <p className="text-center mt-2">{collection.name}</p>
                </SwiperSlide>
              )
            )
          )}{" "}
        </Swiper>
      </div>
    </div>
  );
};
export default LandingPage;
