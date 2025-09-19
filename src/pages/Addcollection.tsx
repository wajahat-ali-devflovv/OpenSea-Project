import React from "react";
import { useDispatch } from "react-redux";
import { addCollectionRequest } from "../store/actions/collectionsActions";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { collectionSchema } from "../validations/collectionValidation";

const AddCollection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-6 text-white bg-[#101011] h-screen">
      <h1 className="text-xl mb-4">Add New Collection</h1>

      <Formik
        initialValues={{ name: "", description: "", image: null }}
        validationSchema={collectionSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("description", values.description);
          if (values.image) {
            formData.append("image", values.image);
          }

          dispatch(addCollectionRequest(formData));
          navigate("/");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col gap-4 w-[300px]">
            {/* Name */}
            <Field
              name="name"
              placeholder="Collection Name"
              className="p-2 rounded bg-gray-800"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* Description */}
            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              className="p-2 rounded bg-gray-800"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* Image Upload */}
            <input
              type="file"
              name="image"
              onChange={(event) =>
                setFieldValue("image", event.currentTarget.files?.[0] || null)
              }
              className="p-2"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* Submit */}
            <button type="submit" className="bg-blue-600 p-2 rounded">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCollection;
