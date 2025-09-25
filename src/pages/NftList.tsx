import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchNftsRequest,
  addNftRequest,
  updateNftRequest,
  deleteNftRequest,
} from "../store/actions/nftsActions";
import type { RootState } from "../store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import slideImage2 from "../assets/images/slider2.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { nftValidationSchema } from "../validations/nftSchema";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
function NFTList() {
  //const user = JSON.parse(localStorage.getItem("user") || "{}");
  const cartItems = useSelector((state: RootState) => state.cart.items) || [0];
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.nfts
  );
  const { user } = useSelector((state: RootState) => state.auth);
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
  formData;
  // Add local state to track when to refresh the list
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleOpen = (nft?: any) => {
    if (nft) {
      setEditMode(true);
      setSelectedNFT(nft);
      setFormData({
        name: nft.name,
        description: nft.description,
        price: nft.price,
        status: nft.status,
        image: nft.image,
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

  const handleClose = () => {
    setOpen(false);
    setSelectedNFT(null);
  };

  const handleDelete = (nftId: number) => {
    if (window.confirm("Are you sure you want to delete this NFT?")) {
      if (token) {
        dispatch(deleteNftRequest(nftId.toString(), token));
        //
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: selectedNFT?.name || "",
      description: selectedNFT?.description || "",
      price: selectedNFT?.price || "",
      status: selectedNFT?.status || "",
      image: null, // <-- keep image in formik state
    },
    validationSchema: nftValidationSchema(editMode),
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = new FormData();
      payload.append("name", values.name);
      payload.append("description", values.description);
      payload.append("price", values.price);
      payload.append("status", values.status);
      if (values.image) {
        payload.append("image", values.image);
      }

      if (!token) return;

      if (editMode && selectedNFT) {
        dispatch(updateNftRequest(selectedNFT.id.toString(), payload, token));
      } else {
        if (collectionId) {
          dispatch(addNftRequest(collectionId, payload, token));
        }
      }

      // Refresh the list after add/edit
      if (collectionId) {
        dispatch(fetchNftsRequest(collectionId));
      }

      handleClose();
    },
  });

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchNftsRequest(collectionId));
    }
  }, [dispatch, collectionId, refreshTrigger]); // Add refreshTrigger as dependency

  if (loading) return <p>Loading NFTs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed z-[100] flex w-[97%] h-[65px] relative right-0 align-center py-[10px]">
        <div className="header w-[98%] flex flex-row justify-between ml-[40px]">
          {user?.role === "user" && (
            <div className="flex flex-row gap-[15px] fixed right-5">
              <Button className="relative" onClick={() => navigate("/cart")}>
                <ShoppingCartIcon sx={{ color: "white" }} />
                <span className="absolute bottom-0 right-[15px] text-purple-600 font-bold">
                  {cartItems.length}
                </span>
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Swiper */}
      <div>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          className="custom-swiper opacity-80"
        >
          <SwiperSlide>
            <img src={slideImage2} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Featured NFTs */}
      <div>
        <div className="flex flex-row justify-between items-center mt-[20px] mb-[10px] mr-[40px]">
          <div>
            <h1 className="text-[12px] md: font-[600] ml-[40px] text-white sm:text-[1rem]">
              Featured NFTs
            </h1>
            <span className="text-[11px] font-[500] ml-[40px] text-[#8a8b8d]">
              This week's NFT's collections
            </span>
          </div>
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

        {/* No NFTs state */}
        {(!Array.isArray(items) || items.length === 0) && (
          <div>
            <p className="text-[#DC143C] text-[32px] text-center font-800 ">
              No NFTs found in this collection.
            </p>
          </div>
        )}

        {/* NFT cards */}
        <div className=" nft-div flex gap-[20px] flex-wrap mx-[40px] mb-[80px] relative">
          {Array.isArray(items) &&
            items
              .filter((nft: any) => nft.status !== "sold") // hide sold NFTs
              .map((nft: any) => (
                <div className="relative ">
                  <Card
                    key={nft.id}
                    sx={{
                      width: 250,
                      padding: "2px",
                      backgroundColor: "#1e1e1e",
                      color: "white",
                      borderRadius: 2,
                      boxShadow: 3,
                      maxHeight: "414px",
                    }}
                    className="card-div max:h-[414px]"
                  >
                    {/* Image */}
                    <CardMedia
                      component="img"
                      image={nft.image_url}
                      alt={nft.name}
                      style={{ objectFit: "fill" }}
                      className="h-[230px]"
                    />

                    {/* Content */}
                    <CardContent className="relative">
                      <Typography variant="h6" fontWeight={600}>
                        {nft.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="gray"
                        sx={{ overflow: "hidden" }}
                      >
                        {nft.description}
                      </Typography>
                      <Typography variant="body1" mt={1} className="">
                        <b>Price:</b>{" "}
                        <span className="text-[15px]">{nft.price}</span> ETH
                      </Typography>
                      <Typography variant="body2" mt={0.5}>
                        <b>Status:</b>{" "}
                        <span
                          style={{
                            color:
                              nft.status === "available" ? "lightgreen" : "red",
                            fontWeight: 600,
                          }}
                          className="mb-[10px]"
                        >
                          {nft.status}
                        </span>
                      </Typography>
                    </CardContent>

                    {/* Actions */}
                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        position: "relative",
                        height: "40px",
                        bottom: "10px",
                      }}
                    >
                      {user?.role === "user" && nft.status === "available" && (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          fullWidth
                          onClick={() => {
                            dispatch({ type: "ADD_TO_CART", payload: nft });
                          }}
                        >
                          Add to Cart
                        </Button>
                      )}

                      {user?.role === "admin" && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className=""
                            onClick={() => handleOpen(nft)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(nft.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </div>
              ))}
        </div>
      </div>

      {/* Dialog */}
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
              helperText={formik.touched.name && (formik.errors.name as string)}
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
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description &&
                (formik.errors.description as string)
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
              helperText={
                formik.touched.price && (formik.errors.price as string)
              }
            />

            <RadioGroup
              row
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel
                value="available"
                control={<Radio />}
                label="Available"
              />
              <FormControlLabel value="sold" control={<Radio />} label="Sold" />
            </RadioGroup>
            {formik.touched.status && formik.errors.status && (
              <FormHelperText error>
                {formik.errors.status as string}{" "}
              </FormHelperText>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                formik.setFieldValue("image", file);
              }}
              className="mt-[10px] cursor-pointer"
            />
            {formik.touched.image && formik.errors.image && (
              <FormHelperText error>{formik.errors.image}</FormHelperText>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default NFTList;
