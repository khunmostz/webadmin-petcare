import * as React from "react";
import Layout from "../../components/Layout/Layout";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

export default function Store() {
  return <Layout>from admin store</Layout>;
}
