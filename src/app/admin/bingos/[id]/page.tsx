import AdminHeader from "@/components/admin/header";
import { getBingo } from "@/firebase/bingo/read";

function generateStaticParams() {}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const response = await getBingo(id);
  const bingo = response.error ? null : response.result;
  return (
    <div className="min-h-full">
      <AdminHeader />
      {bingo ? <h1>Bingo: {bingo.name}</h1> : <h1>Bingo não encontrado.</h1>}

      <ul role="list" className="m-10 divide-y divide-gray-100">
        <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Item da cartela
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                  Numero, Palavra, frase
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  placeholder="janesmith"
                />
              </div>
            </div>
          </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">Salvar</p>
          </div>
        </li>
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                Leslie Alexander
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                leslie.alexander@example.com
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">Editar / Apagar</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
