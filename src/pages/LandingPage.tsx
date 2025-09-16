import React, { useState, useEffect } from "react";
import Button1 from "../components/Button";
import InputField from "../components/InputField";
import userIcon from "../assets/icons/icons8-user-16.png";
import Button from "@mui/material/Button";
import ButtonComp from "../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import slideImage1 from "../assets/images/slider1.jpg";
import slideImage2 from "../assets/images/slider2.png";
import slideImage3 from "../assets/images/slider3.jpeg";
//import slideImage4 from "../assets/images/slider4.jpg";
//import slideImage5 from "../assets/images/slider5.jpg";
//import slideImage6 from "../assets/images/slider6.jpg";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional

// import modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const LandingPage = () => {
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
            <button className=" w-[132px] h-[40px]  text-[#ffffff] font-[500] text-[14px] rounded-[7px]  ">
              Connect Wallet
            </button>
            <a className="w-[40px] h-[40px] flex p-[5px] " href="">
              <img
                className="flex self-center w-[17px] h-[17px] rounded-[9px] outline-[1px] outline-white "
                src={userIcon}
                alt=""
              />
            </a>{" "}
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
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "#ACADAE",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            Gaming
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "#ACADAE",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            Art
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "#ACADAE",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            PFPs
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "#ACADAE",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            More
          </Button>
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
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            .
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            .
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            .
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            .
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            .
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            .
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            .
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            ...
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "gray",
              backgroundColor: "#101011",
            }}
          >
            .
          </Button>
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
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          loop={true}
          className="nft-slider custom-swiper"
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
    </div>
  );
};
export default LandingPage;
