import React from "react";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return <div className="container mx-auto grid place-items-center mt-12">{props.children}</div>;
}
