import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import React from "react";
import app from "../utils/firebaseConfig";

const withAuth = (WrappedComponent) => (props) => {
  const router = useRouter();
  const { route } = router;
  const auth = getAuth(app);

  // is fetching session (eg. show spinner)
  if (auth.currentUser) {
    return <WrappedComponent {...props} />;
  }

  // If user is not logged in, return login component
  if (route !== "/") {
    if (!auth.currentUser) {
      router.push(`/`);
      return null;
    } else if (route == "/") {
      router.push(`/dashboard`); // default page after login when call root path
      return null;
    }
  } else {
    if (auth.currentUser) {
      router.push(`/dashboard`); // default page after login
      return null;
    }
  }

  // If user is logged in, return original component
  return null;

  //   return null;
};

export default withAuth;
