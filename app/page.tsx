"use client"
import { useEffect } from "react";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return null;
};

export default Page;