import * as Yup from "yup";

export const nftValidationSchema = (isEditMode: boolean) =>
  Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be greater than 3 ")
      .max(25, "Name must be less than 25"),
    description: Yup.string()
      .required("Description is required")
      .min(15, "Name must be greater than 15 ")
      .max(55, "Name must be less than 55"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
    status: Yup.string()
      .oneOf(["available", "sold"], "Invalid status") // ✅ restricts to radio values
      .required("Status is required"),
    image: !isEditMode
      ? Yup.mixed().required("Image is required")
      : Yup.mixed().nullable(),
  });
