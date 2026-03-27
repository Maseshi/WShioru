import { Outlet } from "react-router-dom";

import Header from "@/layouts/Default/Header";
import Footer from "@/layouts/Default/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
