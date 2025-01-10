import AdminHeader from "@/components/admin/header";
import Item from "@/components/admin/Items";
import NovoItem from "@/components/admin/NovoItem";
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
      {bingo ? (
        <h2 className="p-4 text-3xl font-bold tracking-tight text-gray-900">
          Bingo: {bingo.name}
        </h2>
      ) : (
        <h2>Bingo não encontrado.</h2>
      )}
      <div className="grid grid-cols-3 gap-4 place-content-center">
        <div>
          <NovoItem id={id} />
        </div>
        <div className="col-span-2">
          <ul role="list" className="m-10 divide-y divide-gray-100">
            {items.result &&
              items.result.map((item) => {
                return <Item key={item.id} item={item} bingoId={id} />;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
