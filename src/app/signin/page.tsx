"use client";
import React, { FormEvent } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
        alert('Usuário ou senha inválida');
        return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://schirrel.dev/assets/squirrel-rounded.png"
          alt="Schirrel"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Acessar sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleForm}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
