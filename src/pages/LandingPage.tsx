import { useEffect } from "react";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import slideImage1 from "../assets/images/slider1.jpg";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionsRequest } from "../store/actions/collectionsActions";
import type { RootState } from "../store/store";
import AddIcon from "@mui/icons-material/Add";
import { Navigation } from "swiper/modules";
import Navbar from "../components/Navbar";
import NavgationButton from "../components/NavigationButton";
import Carousel from "../components/Carousel";
const LandingPage = () => {
  const navigate = useNavigate();
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
      <Navbar />
      <NavgationButton />
      <Carousel />
      <div>
        <div className="flex flex-row justify-between  items-center mt-[20px] mb-[10px] mr-[40px] ">
          <div>
            <h1 className="sm:text-[25px] font-[600] ml-[40px]">
              Featured Collections
            </h1>
            <span className="text-[6px] sm:text-[14px] font-[500] ml-[40px] text-[#8a8b8d]">
              This week's curated collections
            </span>
          </div>
          <div className="w-20% flex justify-end">
            {" "}
            {user?.role === "admin" && ( // 👈 Only show if admin
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                size="small"
                sx={{
                  fontSize: { xs: "0.5rem", sm: "0.7rem", md: "1rem" },
                  padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" },
                  width: { xs: "80px", sm: "100px", md: "180px" },
                  height: { xs: "30px", sm: "35px", md: "60px" },
                }}
                onClick={() => {
                  navigate("/add-collection");
                }}
              >
                Add Collection
              </Button>
            )}
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            360: { slidesPerView: 1 },
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
