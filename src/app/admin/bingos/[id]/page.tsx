import AdminHeader from "@/components/admin/header";
import Item from "@/components/admin/Item";
import { getBingo, getBingoItems } from "@/firebase/bingo/read";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const response = await getBingo(id);
  const bingo = response.error ? null : response.result;

  const items = await getBingoItems(id);
  return (
    <div className="min-h-full">
      <AdminHeader />
      {bingo ? <h1>Bingo: {bingo.name}</h1> : <h1>Bingo não encontrado.</h1>}

      <ul role="list" className="m-10 divide-y divide-gray-100">
        <Item id={id} />

        {items.result &&
          items.result.map((item) => {
            return (
              <li key={item.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                </div>
                <div className="flex w-52">
                  <div className="items-end content-end self-end ml-auto">
                    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4">
                      Editar
                    </button>
                  </div>
                  <div className="items-end content-end self-end ml-auto">
                    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4">
                      Apagar
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
