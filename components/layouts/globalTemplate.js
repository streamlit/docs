import React from "react";
import Header from "../navigation/header";

const Layout = ({ children }) => {
  return (
    <main id="root" className="dark:bg-gray-100">
      <Header />
      {children}
    </main>
  );
};

export default Layout;
