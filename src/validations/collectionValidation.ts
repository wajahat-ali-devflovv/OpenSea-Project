import * as Yup from "yup";

export const collectionSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Collection name is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Only JPG/PNG allowed", (value: any) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
});
