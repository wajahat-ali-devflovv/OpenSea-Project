import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slideImage1 from "../assets/images/slider1.jpg";
import slideImage2 from "../assets/images/slider2.png";
import slideImage3 from "../assets/images/slider3.jpeg";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional
import { Swiper, SwiperSlide } from "swiper/react";
const Carousel: React.FC = () => {
  const sliderImages = [slideImage1, slideImage2, slideImage3];
  return (
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
        {sliderImages.map((image, index) => (
          <SwiperSlide>
            <img key={index} src={image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
