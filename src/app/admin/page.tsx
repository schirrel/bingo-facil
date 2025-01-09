"use client";
import React, { FormEvent } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signout from "@/firebase/auth/signout";
import { createNewBingo } from "@/firebase/bingo/create";
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [value, setValue] = React.useState("");

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    const result = await createNewBingo(value);
    if (!result.error && result.result) {
      router.push("/admin/bingos/" + result.result.id);
    }
  };
  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="block">
                <div className="flex items-baseline space-x-4">
                  <a
                    href="#"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Novo Bingo
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Meus Bingos
                  </a>

                  <div className="block md:hidden">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        onClick={signout}
                        className="block px-4 py-2 text-sm text-white"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  onClick={signout}
                  className="block px-4 py-2 text-sm text-white"
                >
                  Sair
                </button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Bingo Fácil
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <form
            onSubmit={handleForm}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="id"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nome do bingo
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                  name="id"
                  id="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salvar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Page;
