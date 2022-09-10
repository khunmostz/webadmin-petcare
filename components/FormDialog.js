import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form, Field, FormikProps } from "formik";
import { Box } from "@mui/material";
import Image from "next/image";
import imgPlcholder from "../public/static/image/imageplaceholder.jpg";
import { postPromotion } from "../services/serverService";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

export default function FormDialog({ open, onDialogOpen, onDialogClose }) {
  const [images, setImages] = React.useState([]);
  const [imageURL, setImageURL] = React.useState([]);

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);

  const router = useRouter();

  React.useEffect(() => {
    if (images.length < 1) return;
    const newImages = [];
    images.forEach((image) => newImages.push(URL.createObjectURL(image)));
    setImageURL(newImages);
  }, [images]);

  function onImageSelected(e) {
    setImages([...e.target.files]);
  }

  console.log(`Images: ${images}`);

  const showForm = ({ values, handleSubmit, handleChange, setFieldValue }) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Box className="flex flex-col">
          <Box className="mb-4">
            <Field
              className="w-full"
              component={TextField}
              name="promotionId"
              id="promotionId"
              required
              label="PromotionId"
              onChange={handleChange}
            />
          </Box>
          <Box className="mb-4">
            <Field
              className="w-full"
              component={TextField}
              name="promotionTitle"
              id="promotionTitle"
              required
              label="PromotionTitle"
              onChange={handleChange}
            />
          </Box>
          <Box className="mb-4">
            <Field
              className="w-full"
              component={TextField}
              name="adminId"
              id="adminId"
              required
              label="AdminId"
              onChange={handleChange}
            />
          </Box>
          <Box className="mb-4 flex flex-col">
            <Button variant="contained" component="label">
              Upload
              <input
                type="file"
                hidden
                onChange={(e) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="fileImage"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </Button>
            <Image
              objectFit="contain"
              src={values.file_obj}
              width={300}
              height={300}
            />
          </Box>

          <DialogActions>
            <Button onClick={onDialogClose}>Cancel</Button>
            <Button type="submit" on>
              Accepth
            </Button>
          </DialogActions>
        </Box>
      </Form>
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={onDialogClose}>
        <DialogTitle>Promotions</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              promotionId: "",
              promotionImage: "",
              promotionTitle: "",
              adminId: "",
            }}
            onSubmit={async (value, { setSubmitting }) => {
              //   alert(JSON.stringify(value.file));
              let data = new FormData();
              data.append("promotionId", String(value.promotionId));
              data.append("promotionTitle", value.promotionTitle);
              data.append("adminId", String(value.adminId));

              if (value.file) {
                data.append("fileImage", value.file);
              }

              await postPromotion(data);
              setSubmitting(false);
              router.reload();
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
