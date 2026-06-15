import Navbar from "@/src/components/navbar";
import React from "react";

type Props = { children: React.ReactNode };

const layout = (props: Props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default layout;
