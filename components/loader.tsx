"use client";
import Lottie from "lottie-react";
import loaderData from "./loading.json";

export default function Loader(props: LoaderProps) {
  return <Lottie {...props} animationData={loaderData} loop />;
}

export type LoaderProps = Omit<
  React.ComponentProps<typeof Lottie>,
  "animationData" | "loop"
>;
