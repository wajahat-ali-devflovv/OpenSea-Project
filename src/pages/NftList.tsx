import React, { useEffect, useState } from "react";
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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  ADD_NFT_REQUEST,
  UPDATE_NFT_REQUEST,
  DELETE_NFT_REQUEST,
} from "../store/const";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { nftValidationSchema } from "../validations/nftSchema";

function NFTList() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [cartItems, setCartItems] = useState<any[]>([0]); // State for cart items
  const { collectionId } = useParams(); // 👈 from /collections/:collectionId/nfts
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.nfts
  );
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "",
    image: null as File | null,
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchNftsRequest(collectionId));
    }
  }, [dispatch, collectionId]);

  // 📝 Handle input changes
  const handleOpen = (nft?: any) => {
    if (nft) {
      setEditMode(true);
      setSelectedNFT(nft);
      setFormData({
        name: nft.name,
        description: nft.description,
        price: nft.price,
        status: nft.status,
        image: null,
      });
    } else {
      setEditMode(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "",
        image: null,
      });
    }
    setOpen(true);
  };

  // 📝 Handle close
  const handleClose = () => {
    setOpen(false);
    setSelectedNFT(null);
  };

  // 📝 Handle form submit
  const handleSubmit = () => {
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("status", formData.status);
    if (formData.image) payload.append("image", formData.image);

    if (editMode && selectedNFT) {
      dispatch({
        type: UPDATE_NFT_REQUEST,
        payload: { nftId: selectedNFT.id, nftData: payload, token },
      });
    } else {
      dispatch({
        type: ADD_NFT_REQUEST,
        payload: { collectionId, nftData: payload, token },
      });
    }

    handleClose();
  };

  // 🗑 Delete NFT
  const handleDelete = (nftId: number) => {
    if (window.confirm("Are you sure you want to delete this NFT?")) {
      dispatch({
        type: DELETE_NFT_REQUEST,
        payload: { nftId, token },
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      status: formData.status,
    },
    validationSchema: nftValidationSchema,
    enableReinitialize: true, // re-fill values when editing
    onSubmit: (values) => {
      const payload = new FormData();
      payload.append("name", values.name);
      payload.append("description", values.description);
      payload.append("price", values.price);
      payload.append("status", values.status);
      if (formData.image) payload.append("image", formData.image);

      if (editMode && selectedNFT) {
        dispatch({
          type: UPDATE_NFT_REQUEST,
          payload: { nftId: selectedNFT.id, nftData: payload, token },
        });
      } else {
        dispatch({
          type: ADD_NFT_REQUEST,
          payload: { collectionId, nftData: payload, token },
        });
      }

      handleClose();
    },
  });

  if (loading) return <p>Loading NFTs...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div>
        <p className="text-[#DC143C] text-[32px] text-center font-800 ">
          No NFTs found in this collection.
        </p>

        {/* 👑 Admin Add Button */}
        {user?.role === "admin" && (
          <div>
            <h1 className="text-[#A7E399]  mb-5">
              ADMIN!!! Click the button below to add new collection
              <ArrowDownwardIcon />
            </h1>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen()}
                style={{ marginBottom: "20px" }}
                className="absolute right-10 "
              >
                + Add NFT
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <nav className=" flex w-[97%] h-[65px] sticky right-0 align-center py-[10px]  ">
        <div className="header w-[98%] flex flex-row justify-between    text-[14px]  ml-[40px] ">
          <div className=" flex flex-row    text-[14px] gap-[15px] fixed right-5  ">
            <>
              <Button
                className="relative"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <ShoppingCartIcon sx={{ color: "white" }} />
                <span className="absolute bottom-0 right-[15px] text-red-600 ">
                  {cartItems}
                </span>
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
      <div>
        <div>
          <div className="flex flex-row justify-between  items-center mt-[20px] mb-[10px] mr-[40px] ">
            <div>
              <h1 className="text-[25px] font-[600] ml-[40px] text-white">
                Featured NFTs
              </h1>
              <span className="text-[14px] font-[500] ml-[40px] text-[#8a8b8d]">
                This week's NFT's collections
              </span>
            </div>
            {/* 👑 Admin Add Button */}
            {user?.role === "admin" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen()}
                style={{ marginBottom: "20px" }}
              >
                + Add NFT
              </Button>
            )}
          </div>

          <div
            style={{
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
                  backgroundColor: "#fff",
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

                {/* 👑 Admin Edit/Delete */}
                {user?.role === "admin" && (
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpen(nft)}
                      size="small"
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(nft.id)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 📝 Dialog for Add/Edit NFT */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{editMode ? "Edit NFT" : "Add NFT"}</DialogTitle>
            <form
              onSubmit={formik.handleSubmit}
              style={{ padding: "10px", minWidth: "400px" }}
            >
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Name"
                  name="name"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                  margin="dense"
                  label="Description"
                  name="description"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />

                <TextField
                  margin="dense"
                  label="Price (ETH)"
                  name="price"
                  type="number"
                  fullWidth
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />

                <TextField
                  margin="dense"
                  label="Status"
                  name="status"
                  fullWidth
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFormData({ ...formData, image: file }); // keep using your state for file
                  }}
                  style={{ marginTop: "10px" }}
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>{" "}
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default NFTList;
