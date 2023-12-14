"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContextProvider } from "@/context/AuthContext";
const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return null;
};

export default Page;
