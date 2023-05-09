"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "utils/errors";

interface signUpUser {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function Page() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const signup = async ({ name, email, username, password }: signUpUser) => {
    try {
      await axios.post("/api/register", {
        name,
        username,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: true,
        username,
        password,
        callbackUrl: "/",
      });
      if (result?.error) {
        toast.error(result.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success("Cadastrado com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error(getError(err), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <main className="container m-auto mt-4 px-4">
      {/* @ts-ignore */}
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(signup)}>
        <h1 className="mb-4 text-xl">Cadastre-se</h1>
        <div className="mb-4">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register("name", {
              required: "Nome é obrigatório",
            })}
          />
          {errors.name && (
            <div className="text-red-500">
              {errors.name.message?.toString()}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full"
            id="email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Entre com um email valido",
              },
            })}
          ></input>
          {errors.email && (
            <div className="text-red-500">
              {errors.email.message?.toString()}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="w-full"
            id="username"
            autoFocus
            {...register("username", {
              required: "Escolha um nome de usuário",
            })}
          />
          {errors.username && (
            <div className="text-red-500">
              {errors.username.message?.toString()}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="w-full"
            id="password"
            autoFocus
            {...register("password", {
              required: "Defina uma senha",
              minLength: {
                value: 6,
                message: "Sua senha precisa ter mais de 5 caracteres",
              },
            })}
          ></input>
          {errors.password && (
            <div className="text-red-500 ">
              {errors.password.message?.toString()}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirme sua senha</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirme sua senha",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "Sua senha precisa ter mais de 5 caracteres",
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message?.toString()}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">As senhas combinam</div>
            )}
        </div>

        <div className="mb-4 ">
          <button className="primary-button">Cadastre-se</button>
        </div>
        <div className="mb-4 ">
          Já possui conta ?&nbsp;
          <Link href="/auth/login">Login</Link>
        </div>
      </form>
    </main>
  );
}
