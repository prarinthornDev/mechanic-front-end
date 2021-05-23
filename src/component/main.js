import React from "react";
import Footer from "./footer";
import Header from "./header";

export default function main(props) {
  return (
    <>
      <Header />
      <div className="main">{props.children}</div>
      <Footer />
    </>
  );
}
