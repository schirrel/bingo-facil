"use client";
import React, { FormEvent, useState } from "react";

function Page() {

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
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
          Participar de um bingo existente
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
              htmlFor="id"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Sua cartela:
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
          <div
            className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
            role="alert"
          >
            <p>O identificador fornecido pelo criador do bingo para acessar sua cartela</p>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Jogar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
