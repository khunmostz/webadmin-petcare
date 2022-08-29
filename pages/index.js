import Image from "next/image";
import Nav from "../components/Nav";
import bgImage from "../public/static/image/Leadership and teamwork concept.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Typography, TextField, Box } from "@mui/material";
import { Formik, Form, Field, FormikProps } from "formik";
import React, { useEffect } from "react";
import app from "../utils/firebaseConfig";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { userSelector } from "../store/slices/userSlice";

export default function Home() {
  const user = useSelector(userSelector);

  const router = useRouter();
  const auth = getAuth(app);

  const showForm = ({ values, handleSubmit, handleChange }) => {
    return (
      <Form
        onSubmit={handleSubmit}
        className="bg-white  rounded pt-6 pb-8 mb-4"
      >
        <Box className="mb-4">
          <Field
            component={TextField}
            name="email"
            id="email"
            required
            label="Email"
            onChange={handleChange}
            value={values.email}
            className="w-full"
          />
        </Box>
        <Box className="mb-12">
          <Field
            component={TextField}
            className="w-full"
            type="password"
            name="password"
            required
            label="Password"
            onChange={handleChange}
            value={values.password}
            id="password"
          />
        </Box>
        <Box className=" hover:animate-bounce duration-300">
          <Button
            // href="/test"
            className="w-full bg-orange-300 text-black font-medium xs:w-full shadow-lg shadow-orange-500/70 hover:bg-orange-400 text-md border hover:text-white text-base border-orange-500 px-28 py-3 duration-300"
            type="Sumbit"
          >
            Sign In
          </Button>
        </Box>
      </Form>
    );
  };

  return (
    <React.Fragment>
      <Nav></Nav>

      <Box className=" mx-auto w-full max-w-screen h-full lg:mt-28 flex flex-row 2xl:flex-row lg:flex-row md:flex-col md:mt-6 sm:flex-col xs:flex-col sm:justify-center  justify-between border-red-600 my-4">
        <Box className="w-full">
          <Image src={bgImage} className="object-contain"></Image>
        </Box>
        <Box className="w-full px-4 ">
          <Box className="w-full flex h-full flex-col sm:px-4">
            <Box className="text-start">
              <Typography className="text-2xl font-bold mb-2 ">
                Welcome to Petcare! {user.username}
              </Typography>
              <Typography className="text-gray-400">
                Sign In your account
              </Typography>
            </Box>
            <Box className="h-full mt-4">
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (value) => {
                  // alert(JSON.stringify(value));
                  try {
                    if (value.email && value.password != null) {
                      await signInWithEmailAndPassword(
                        auth,
                        value.email,
                        value.password
                      ).then(() => {
                        router.push("/admin/dashboard");
                      });
                    } else {
                      return;
                    }
                  } catch (error) {
                    console.log(error.message);
                    // alert(err.message);
                  }
                }}
              >
                {(props) => showForm(props)}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
