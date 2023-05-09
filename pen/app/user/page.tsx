"use client";
import Button from "@elements/Button";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { User } from "types/intefaces";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User>();

  return <p>login</p>;
};

export default page;
