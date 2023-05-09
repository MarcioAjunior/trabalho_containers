"use client";
import Button from "@elements/Button";
import TextBox from "@elements/TextBox";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "utils/errors";
import { useRouter } from "next/navigation";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        toast.error("Credencias incorretas", {
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
        toast.success(`Bem vindo(a) ${username}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => router.push("/"), 500);
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
      <form
        className="mx-auto max-w-screen-md"
        //@ts-ignore
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            type="usename"
            {...register("username", {
              required: "Insira um nome de usuário válido",
            })}
            className="w-full"
            id="usename"
            autoFocus
          ></input>
          {errors.email && (
            //@ts-ignore
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            {...register("password", {
              required: "Entre com sua senha",
              minLength: {
                value: 6,
                message: "Sua senha precisa ter mais de 5 caracteres",
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            //@ts-ignore
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 ">
          Ainda não tem conta ?
          <Link href={`/auth/register`}> Cadastre-se !!</Link>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
