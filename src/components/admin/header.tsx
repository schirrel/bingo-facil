"use client";
import React from "react";
import signout from "@/firebase/auth/signout";
import Link from "next/link";
export default function AdminHeader() {
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="block">
                <div className="flex items-baseline space-x-4">
                  <h1 className="text-md pr-4 font-bold text-white">Bingo Fácil</h1>
                  <Link
                    href="/admin/bingo"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Novo Bingo
                  </Link>
                  <Link
                    href="/admin/bingos"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Meus Bingos
                  </Link>

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
          </div>
        </div>
      </nav>
    </>
  );
};
