import React from "react";
import Header from "../navigation/header";
import Footer from "../navigation/footer";

const Layout = ({ children }) => {
  return (
    <main id="root">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
